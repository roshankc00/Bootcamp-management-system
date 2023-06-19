import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const fileFilter=(req,file,cb)=>{
    if(file.mimetype==="image/jpeg" || file.mimetype==='image/png' || file.memetype==='image/jpg'){
        cb(null,true)
    }else{
        cb(new Error("invalid file type"))
    }

  }



 export  const upload = multer({ storage: storage,
    limits:{
        fieldSize:5*1024*1024
    },
    fileFilter
})