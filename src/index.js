import {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction,
} from "@solana/web3.js";

const MEMO_PROGRAM = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

(async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const wallet = Keypair.generate();

    let airdropTransaction = await connection.requestAirdrop(
        wallet.publicKey,
        LAMPORTS_PER_SOL
    );
    console.log(`wallet pk ${wallet.publicKey.toBase58()}`);
    await connection.confirmTransaction(airdropTransaction);

    // invoke memo program
    let data = Buffer.from("https://github.com/ljx0520/memo");

    let instruction = new TransactionInstruction({
        keys: [],
        programId: MEMO_PROGRAM,
        data: data,
    });

    let transaction = new Transaction().add(instruction)

    let signature = await sendAndConfirmTransaction(connection, transaction, [wallet]);

    console.log(`signature: ${signature}`);
})();
