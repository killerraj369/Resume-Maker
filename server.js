
let express = require("express");
const bodyParser = require("body-parser");
var hbs = require('hbs');
const fs = require('fs');
const Html_Pdf = require('html-pdf');
const Handlebars = require("hbs");
const { resolve } = require("path");
const template = fs.readFileSync(__dirname+"/views/final.hbs", "utf8")
const DOC = Handlebars.compile(template);
var port = process.env.PORT || 3000;


let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set('view engine', 'hbs');

// Global variables that will be used to get the information and make the final resume

let first;   // First Name
let second;  // Last Name
let add;     // Address
let city;
let zip;     // Postal code (110093)
let email;
let country;
let phone;
let professional;

// Educational Details

let college;
let college_city;
let college_add;
let degree;
let field;
let graduation_date;
let school_12;
let marks_12;
let school_10;
let marks_10;
let board_12;
let board_10;

// Experience Details

let employer;
let job;
let company_city;
let company_state;
let start_date;
let end_date;
let job_desc;


// Skills details

let skill1;
let skill2;
let skill3;
let skill4;
let skill5;
let skill6;

let level1;
let level2;
let level3;
let level4;
let level5;
let level6;

// Hobby 

let hobb;

function _createPdfStream(html) {
    return new Promise(function (resolve, reject) {
        let border = "25px";
        let pdf_options = {
            format: 'Letter',
            border: { top: border, right: border, bottom: border, left: border },
            // footer: {
            //     height: "30px",
            //     width: "100%",
            //     // contents: {
            //     //     defualt: < div class="footer" style="text-align:right;">
            //     //    </div >
            //     // }
            // }
        };

        Html_Pdf.create(html,pdf_options).toStream(function(err,stream){
            if(err)
            {
                return reject(err);
                console.log(err)
            }
            return resolve(stream);
        });
    });
    
}

function _streamToBuffer(Stream,cb)
{
    const chunks =[];
    Stream.on('data',(chunk) => {
        chunks.push(chunk);
    });
    
    Stream.on('end' ,() => {
        return cb(null,Buffer.concat(chunks));
    }
    );

    Stream.on('error',(e) => {
        return cb(e);
    });
}


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/html files/home.html");
})

app.post("/", function (req, res) {

})




app.get("/personal_info", function (req, res) {
    res.sendFile(__dirname + "/html files/personal_info.html");
})

app.post("/personal_info", function (req, res) {
    first = req.body.first;
    second = req.body.second;
    add = req.body.add;
    ctiy = req.body.city;
    zip = req.body.zip;
    email = req.body.email;
    country = req.body.Country;
    phone = req.body.phone;
    professional=req.body.professional_summary;

    // console.log(first);
    // console.log(b);
    // console.log(c);
    // console.log(d);
    // console.log(e);
    // console.log(f);
    // console.log(g);
    // console.log(h);

    res.redirect("/education");


})



app.get("/education", function (req, res) {
    res.sendFile(__dirname + "/html files/education.html")
})

app.post("/education", function (req, res) {
    college = req.body.college;
    college_city = req.body.college_city;
    college_add = req.body.college_add;
    degree = req.body.degree;
    field = req.body.field;
    graduation_date = req.body.graduation_date;
    school_12=req.body.school_12;
    marks_12=req.body.marks_12;
    school_10=req.body.school_10;
    marks_10=req.body.marks_10;
    board_10=req.body.board_10;
    board_12=req.body.board_12;

    res.redirect("/exp");
})


app.get("/exp", function (req, res) {
    res.sendFile(__dirname + "/html files/experience.html");
})
app.post("/exp", function (req, res) {
    employer = req.body.employer;
    job = req.body.job;
    company_city = req.body.company_city;
    company_state = req.body.company_state;
    start_date = req.body.start_date;
    end_date = req.body.end_date;
    job_desc = req.body.job_description;



    res.redirect("/skills");
})


app.get("/skills", function (req, res) {
    res.sendFile(__dirname + "/html files/skills.html")
})

app.post("/skills", function (req, res) {
    // res.send("Wait bitch we are working on this")
    skill1 = req.body.skill1;
    skill2 = req.body.skill2;
    skill3 = req.body.skill3;
    skill4 = req.body.skill4;
    skill5 = req.body.skill5;
    skill6 = req.body.skill6;

    level1 = req.body.level1;
    level2 = req.body.level2
    level3 = req.body.level3
    level4 = req.body.level4
    level5 = req.body.level5;
    level6 = req.body.level6;
    hobb= req.body.hobby;


    res.redirect("/preview")
})





app.get("/preview", function (req, res) {
    res.render('preview', {
        first_name: first,
        second_name: second,
        em: email,
        ph: phone,
        pro:professional,
        co: country,
        deg: degree,
        col: college,
        
        jo: job,
        emp: employer,
        ct: company_city,
        sd: start_date,
        ld: end_date,
        des: job_desc,
        sk1: skill1,
        lvl1: level1,
        sk2: skill2,
        lvl2: level2,
        sk3: skill3,
        lvl3: level3,
        sk4: skill4,
        lvl4: level4,
        sk5: skill5,
        lvl5: level5,
        sk6: skill6,
        lvl6: level6,
        ho:hobb
    });
})
app.post("/preview", function (req, res) {
     
})

app.get("/final", function (req, res) 
{

    // {
    //     var config = {
    //         format: "A4",
    //         orientation: "landscape",
    //         base: "http://127.0.0.1:3002/uploads/theme/",
    //         timeout: 100000, 
    //         phantomArgs: ["--web-security=false","--local-to-remote-url-access=true"]
    //     }

    //     var html = await hbs.render('./views/preview.hbs', data)
    //     await fs.writeFile("pdf.html", html, function(err) {
    //         if(err) {
    //             return console.log(err);
    //         }
    //     })
    //     var fileName = uuid.v4()
    //     await pdf.create(html, config).toFile(`./downloads/${fileName}.pdf`, function (err, res) {
    //         if (err) return console.log(err);
    //         response.send({ success: true, data: { downloadURL: fileName } })


    try{

        let html = DOC({
            first_name: first,
            second_name: second,
            em: email,
            ph: phone,
            co: country,
            pro:professional,
            deg: degree,
            col: college,
            jo: job,
            emp: employer,
            ct: company_city,
            sd: start_date,
            ld: end_date,
            des: job_desc,
            sk1: skill1,
            lvl1: level1,
            sk2: skill2,
            lvl2: level2,
            sk3: skill3,
            lvl3: level3,
            sk4: skill4,
            lvl4: level4,
            sk5: skill5,
            lvl5: level5,
            sk6: skill6,
            lvl6: level6,
            ho:hobb
        });

        _createPdfStream(html)
        .then((stream) =>  {
            _streamToBuffer(stream,function(err,buffer)
            {
                if(err)
                {
                    throw new Error(err);
                    
                }
                
                let namePDF ="Resume"+first+second;
                res.setHeader('Content-disposition',"inline; filename*=UTF-8''" +namePDF);
                res.setHeader('Content-type','application/pdf');
                return res.send(buffer);
            })
        })
    }

    catch(err)
    {
        console.error("Error",err);
        res.statusCode=400;
        res.json({error:400,details:err});
    }



    // res.download(__dirname + "/views/preview.hbs");

});



// console.log(first);
// console.log(second);















app.listen(port, function (req, res) {
    console.log("Server has started on the port 3000");
})


