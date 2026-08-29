import { supabase } from "../config/supabase.js";
import { createNotification } from "../utils/createNotification.js";

export const getLiveClasses = async (req,res)=>{

try{

const {data,error}= await supabase
.from("live_classes")
.select(`
 id,
 topic,
 faculty,
 date,
 time,
 status,
 meet_link,
 courses(
 title
 )
`)
.order("date",{ascending:true});


if(error){
return res.status(500).json({
success:false,
error:error.message
})
}


res.json({
success:true,
data
})


}
catch(err){

res.status(500).json({
success:false,
error:err.message
})

}

}
export const addLiveClass = async (req, res) => {
  try {
    const {
      topic,
      faculty,
      date,
      time,
      meet_link,
      course_id,
    } = req.body;

    const { data, error } = await supabase
      .from("live_classes")
      .insert([
        {
          topic,
          faculty,
          date,
          time,
          meet_link,
          course_id,
          status: "Upcoming",
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    // Course ka title nikalo
    const { data: course } = await supabase
      .from("courses")
      .select("title")
      .eq("id", course_id)
      .single();

      await createNotification(
  "admin",
  `New Live Class scheduled for ${course.title}`
);
    // Sab students nikalo
    const { data: students } = await supabase
      .from("users")
      .select("id")
      .eq("role", "student");

    // Sabko notification bhejo
    for (const student of students) {
      await createNotification(
        "student",
        `New Live Class scheduled for ${course.title}`,
        student.id
      );
    }

    res.status(201).json({
      success: true,
      message: "Live class added successfully",
      liveClass: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
export const updateLiveClass = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      topic,
      faculty,
      date,
      time,
      meet_link,
      course_id,
      status,
    } = req.body;


    const { data, error } = await supabase
      .from("live_classes")
      .update({
        topic,
        faculty,
        date,
        time,
        meet_link,
        course_id,
        status,
      })
      .eq("id", id)
      .select()
      .single();


    if (error) {
      return res.status(500).json({
        success:false,
        error:error.message
      });
    }


    res.json({
      success:true,
      message:"Live class updated successfully",
      liveClass:data
    });


  } catch(err){

    res.status(500).json({
      success:false,
      error:err.message
    });

  }
};



export const deleteLiveClass = async (req,res)=>{

  try{

    const {id}=req.params;


    const {error}=await supabase
    .from("live_classes")
    .delete()
    .eq("id",id);



    if(error){

      return res.status(500).json({
        success:false,
        error:error.message
      });

    }


    res.json({
      success:true,
      message:"Live class deleted successfully"
    });



  }catch(err){

    res.status(500).json({
      success:false,
      error:err.message
    });

  }

};