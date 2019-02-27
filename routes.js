const fs = require('fs');
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Personal Project</title></head>');
        res.write('<body><form action="/hello" method="POST"><input type="text" name="message" /><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/hello' && method === 'POST'){
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody);
            fs.writeFileSync('message.txt', message);
        });
        
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
}

module.exports = requestHandler;