import pem from 'pem';
import { writeFileSync } from 'fs';

pem.createCertificate({ days: 365, selfSigned: true }, function (err, keys) {
    if (err) {
        throw err;
    }
    writeFileSync('key.pem', keys.serviceKey);
    writeFileSync('cert.pem', keys.certificate);
    console.log('Certificates generated successfully.');
});
