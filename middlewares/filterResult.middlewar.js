export const filterResults=(model)=>async(req,res,next)=>{
    let query; 
    const reqQuery={...req.query}
    // fields to remove 
    const removeFields=['select','sort',"page","limit"]
    removeFields.forEach(param=>delete reqQuery[param])      
    
    // filtering 
    let queryStr=JSON.stringify(reqQuery)
    query= queryStr.replace(/\b(gt|gte|lt|lte|eq|ne|in)\b/g,match=>`$${match}`)
    query=JSON.parse(query)
    let appendFiterQuery= model.find(query)
    
    // selecting the fields 
    if(req.query.select){
        const fields=req.query.select.split(',').join(' ');
        console.log(fields)
        appendFiterQuery=   appendFiterQuery.select(fields)
    }

    // sorting
    if(req.query.sort){
        const fields=req.query.select.split(',').join(' ');
        console.log(fields)
        appendFiterQuery=   appendFiterQuery.sort('-averageCost')
    }else{
        appendFiterQuery=   appendFiterQuery.sort('-createdAt')
      
    }
    // pagination
       let page=Number(req.query.page) || 1
        let limit=Number(req.query.limit) || 10
        let skip=(page-1)*limit
        console.log(limit,skip,"wow")
        appendFiterQuery=appendFiterQuery.skip(skip).limit(limit)

        const total=await  model.countDocuments()


        let data=await appendFiterQuery;
        let pagination={}
        
        let endIndex=page*limit
        if(endIndex<total){
            pagination.next={
                page:page+1,
                limit
            }
        }
        if(skip>0){
            pagination.prev={
                page:page-1,
                limit
            }
            
        }
        
    if(data.length>0){
        res.filterData={
            sucess:true,
            data,
            total,
            pagination

        }
        next()
    } else{
        throw new Error("no data found")
    }
  
    
}