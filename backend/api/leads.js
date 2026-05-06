import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req,res){
  if(req.method==='GET'){
    const { data } = await supabase.from('leads').select('*');
    res.json(data);
  } else if(req.method==='POST'){
    const { student_name,email,course_id } = req.body;
    const { data,error } = await supabase.from('leads').insert([{student_name,email,course_id}]);
    res.json({data,error});
  }
}
