const mqttClient = require('../config/mqtt.config');
const {
  createRFID,
  getRFIDbyUID,
  getMemberByRFID,
  getBookByRFID,
  findActiveTransaction,
  createTransaction,
  completeTransaction,
  findMemberByRfid,
  findBookByRfid,
} = require('../repositories/mqtt.repository');

mqttClient.on('message', async (topic, message) => {
  console.log(topic);

  try {
    if (topic === 'esp/scan') {
      const uid = message.toString();

      if (!uid) return;

      console.log(`[MQTT] Received scan: UID=${uid}`);

      let existingUID = await getRFIDbyUID(uid);

      if (!existingUID) {
        existingUID = await createRFID(uid);
      }

      if (existingUID) {
        // client/update
        mqttClient.publish('client/update', existingUID.uid);
        console.log('publish esp to client', existingUID.uid);
      }
    }

    if (topic === 'esp/transaction') {
      const messageJson = JSON.parse(message);
      console.log(messageJson);

      let existingMember = await getMemberByRFID(messageJson.member_uid);
      if (!existingMember) {
        mqttClient.publish('esp/transactionMessage', 'Member Tidak Ditemukan');
        console.log('Member Tidak Ditemukan');
      } else {
        let existingBook = await getBookByRFID(messageJson.book_uid);

        if (existingBook) {
          const memberId = existingMember.member.id;
          const bookId = existingBook.book.id;
          const activeTx = await findActiveTransaction(bookId);

          console.log(activeTx);

          // CASE 1: Buku sedang dipinjam oleh member ini → RETURN
          if (activeTx && activeTx.memberId === memberId) {
            await completeTransaction(memberId, bookId);
            mqttClient.publish('esp/transactionMessage', 'Pengembalian berhasil');
            return;
          }

          // CASE 2: Buku sedang dipinjam oleh member lain → CANCEL
          if (activeTx && activeTx.memberId !== memberId) {
            mqttClient.publish('esp/transactionMessage', 'Buku sedang dipinjam oleh member lain. Proses dibatalkan.');
            return;
          }
          // console.log({ existingMember: existingMember });
          // console.log({ existingBook: existingBook });
          // console.log(memberId, bookId);

          // CASE 3: Buku belum dipinjam → BORROW
          const trx = await createTransaction(memberId, bookId);
          mqttClient.publish('esp/transactionMessage', 'Peminjaman berhasil');
          return;
        } else {
          mqttClient.publish('esp/transactionMessage', 'Buku Tidak Tersedia');
          console.log('buku tidak ada');
        }
      }
    }

    // if (topic === 'esp/checkMember') {
    //   const uid = message.toString();
    //   console.log(uid);

    //   if (!uid) return;

    //   console.log(`[MQTT] Received scan: UID=${uid}`);

    //   let existingUID = await getMemberByRFID(uid);

    //   if (existingUID) {
    //     mqttClient.publish('esp/getCheckMember', '1');
    //     console.log('DITEMUKAN');
    //   } else {
    //     mqttClient.publish('esp/getCheckMember', '0');
    //     console.log('TIDAK DITEMUKAN');
    //   }
    // }
  } catch (error) {
    throw error;
  }
});
