// import { createClient } from '@supabase/supabase-js';
// import express from 'express';
// import cors from 'cors';
// import CircularJSON from 'circular-json';

// const app = express();
// app.use(cors());
// app.use(express.json());

// const supabaseUrl = "https://jypooxsngkbddepmrdwt.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cG9veHNuZ2tiZGRlcG1yZHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3NDYzNjYsImV4cCI6MjAwMDMyMjM2Nn0.VncfalS6sf2q1NgSNKpULs0fJztNo4FO0U4ylA_aQ4U";

// const supabase = createClient(supabaseUrl, supabaseKey);

// app.get('/todotable', async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from('todo')
//       .select('*');

//     if (error) {
//       console.error('Error retrieving data from todo table:', error);
//       return res.status(500).json({ error: 'Error retrieving data' });
//     }

//     res.json(data);
//   } catch (error) {
//     console.error('Error retrieving data from todo table:', error.message);
//     res.status(500).json({ error: 'Error retrieving data' });
//   }
// });

// app.post('/todotable', async (req, res) => {
//   try {

//     const serializedData = CircularJSON.stringify(req.body);

//     const { data, error } = await supabase
//     .from('todo')
//     .insert([serializedData]);
  
//     if (error) {
//       console.error('Error inserting data into table:', error);
//       return res.status(500).json({ error: 'Error inserting data' });
//     }

//     res.status(201).json({ message: 'Data inserted successfully' });
//   } catch (error) {
//     console.error('Error inserting data into table:', error.message);
//     res.status(500).json({ error: 'Error inserting data' });
//   }
// });

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });