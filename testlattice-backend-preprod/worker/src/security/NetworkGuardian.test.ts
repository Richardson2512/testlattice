
import { NetworkGuardian } from './NetworkGuardian'

// Quick manual verification script (pseudo-test)
async function test() {
    const guardian = new NetworkGuardian()

    const testCases = [
        'https://google.com',
        'http://localhost:3000',
        'http://127.0.0.1/admin',
        'http://169.254.169.254/latest/meta-data',
        'http://10.10.1.1',
        'https://[::1]/',
        'postgres://user:pass@db.internal', // Wrong protocol
        'http://scanme.nmap.org', // Public
        'http://rbndr.us' // DNS Rebinding (might fail if not internet connected, but logic holds)
    ]

    console.log('Running NetworkGuardian Tests...\n')

    for (const url of testCases) {
        const result = await guardian.validateUrl(url)
        const icon = result.safe ? '✅' : '🛡️'
        console.log(`${icon} ${url.padEnd(40)} -> Safe: ${result.safe}`)
        if (!result.safe) console.log(`   Reason: ${result.reason}`)
    }
}

// execute if running directly
if (require.main === module) {
    test()
}
