import { supabase } from "../config/supabase.js";

export const getStudentNotifications = async (req, res) => {
  try {

    const { userId } = req.params;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .eq("role", "student")

      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      notifications: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }
};
export const getAdminNotifications = async(req,res)=>{
 try{

 const {data,error}=await supabase
 .from("notifications")
 .select("*")
 .eq("role","admin")
 .order("created_at",{ascending:false});


 if(error){
 return res.status(500).json({
 success:false,
 error:error.message
 })
 }


 res.json({
 success:true,
 notifications:data
 })


 }catch(err){

 res.status(500).json({
 success:false,
 error:err.message
 })

 }

}