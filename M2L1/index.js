const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemptate = require('./template/replaceTemplate')
//read data

const tempCourse = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
);
const dataObj = JSON.parse(tempCourse)


const templateHTMLCourse = fs.readFileSync(
    `${__dirname}//template/templateCourse.html`,
    'utf-8'
);


//create Server
const server = httpServer.createServer(function (req, res) {// call back function
    // const urlParameter = url.parse(req.url, true);
    // console.log(JSON.stringify(urlParameter.query)) ;
    // console.log(JSON.stringify(urlParameter.pathname)) ;
    const {query, pathname} = url.parse(req.url, true);
    if (query.id){
        // Courses page
        if (pathname === '/' || pathname.toLowerCase() === '/courses') {
            res.writeHead(200, { // Every thing ran successfully
                'Content-type': 'text/html'
            });
        const course = dataObj[Number(query.id)];
        const strCourseName = JSON.stringify(course);
        const courseHTML = replaceTemptate(templateHTMLCourse, course);
        // res.end(`We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
        // ${JSON.stringify(course)}` )
        // }
        // console.log(courseHTML)
        res.end(courseHTML);
        }
        else{
            res.writeHead(404,  { // Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end('resource not found')
        }
    }
});
// Start Listening to requests
server. listen(8000, 'localhost' , function() {
    console.log('Listening to requests on port 8000');
});