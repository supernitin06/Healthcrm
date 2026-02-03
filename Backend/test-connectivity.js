
import net from 'net';
import dotenv from 'dotenv';

dotenv.config();

const testTcp = (host, port, name) => {
    return new Promise((resolve) => {
        console.log(`\n🕵️ Testing TCP connection to ${name} (${host}:${port})...`);
        console.log(`   (Host length: ${host.length}, Chars: ${JSON.stringify(host)})`);

        const startTime = Date.now();
        const socket = new net.Socket();

        socket.setTimeout(5000); // 5s timeout for TCP

        socket.on('connect', () => {
            const time = Date.now() - startTime;
            console.log(`✅ SUCCESS: Connected to ${name} in ${time}ms`);
            socket.destroy();
            resolve(true);
        });

        socket.on('timeout', () => {
            console.log(`❌ TIMEOUT: Could not connect to ${name} after 5000ms`);
            socket.destroy();
            resolve(false);
        });

        socket.on('error', (err) => {
            console.log(`❌ ERROR: Failed to connect to ${name}: ${err.message}`);
            resolve(false);
        });

        socket.connect(port, host);
    });
};

const run = async () => {
    console.log("--- NETWORK DIAGNOSTIC ---");
    // 1. Check Google (Sanity Check)
    await testTcp('google.com', 80, 'Google (Internet Check)');

    // 2. Check Database
    const dbHost = process.env.DB_HOST;
    if (!dbHost) {
        console.log("❌ DB_HOST is missing in .env");
    } else {
        await testTcp(dbHost, 5432, 'Render Database');
    }
};

run();
 