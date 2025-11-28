import { User } from "../model/user.model.js"
import { fetchFromTMDB } from "../services/tmdb.service.js"


export const searchPerson =async (req,res)=>{

    const {query} = req.params

    try {
        
        const response= await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

       
        if(response.results.length === 0){
            return res.status(404).send(null)
        }

        

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createdAt:new Date() 

                }
            }
        })

        res.status(200).json({success:true,content:response.results})
    } catch (error) {
        console.log("Error from searchPerson controller", error.message)
        res.status(500).json({success:false,message:"Internal server Error"})
        
    }
    
}
export const searchMovie =async (req,res)=>{
    const {query} = req.params
    try {
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)

        if (response.results.length === 0){
          return  res.status(404).send(null)
        }
        

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"movie" ,
                    createdAt: new Date()

                }
            }
        })
         res.status(200).json({success:true,content:response.results})

    } catch (error) {
        console.log("Error from searchMovie controller", error.message)
        res.status(500).json({success:false,message:"Internal server Error"})
        
    }

}
export const searchTv =async (req,res)=>{
    const {query} = req.params
     try {
        
        const response= await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

       
        if(response.results.length === 0){
            return res.status(404).send(null)
        }

       

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"tv",
                    createdAt:new Date() 

                }
            }
        })

        res.status(200).json({success:true,content:response.results})
    } catch (error) {
         console.log("Error from searchTv controller", error.message)
        res.status(500).json({success:false,message:"Internal server Error"})
        
    }

}

export const searchHistory = async (req,res)=>{
    try{
       res.status(200).json({success:true,content:req.user.searchHistory})
    }
    catch(error){
     console.log("Error from searchHistory controller",error.message)
     res.status(500).json({success:false,message:"Internal server Error"})
    }
}

export const deleteSearchHistory = async(req,res)=>{
    let {id}=req.params
    id = parseInt(id)   //we getting id via params as string, so it show success message but , can't updated in DB that's why we changed it string to integer..
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{
                    id:id
                }
            }
        })
        res.status(200).json({success:true,message:"Item removed from search history"})
    } catch (error) {
        console.log("Error from deleteHistory controller",error.message)
        res.status(500).json({success:false,message:"Internal server Error"})
    }
}