import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res){
  if(req.method==='GET'){
    const { data } = await supabase.from('courses').select('*');
    res.json(data);
  } else if(req.method==='POST'){
    const { title, description, category, price, duration, beginner_friendly } = req.body;
    const { data, error } = await supabase.from('courses').insert([{ title, description, category, price, duration, beginner_friendly }]);
    res.json({data,error});
  } else if(req.method==='DELETE'){
    const { id } = req.query;
    const { data, error } = await supabase.from('courses').delete().eq('id', id);
    res.json({data,error});
  }
}
