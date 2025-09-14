// // app/courses/page.tsx
// import { supabase } from '@/lib/supabaseClient';
// import { useEffect, useState } from 'react';

// type Course = { id: string; title: string; description?: string; image_path?: string };

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function load() {
//       const { data, error } = await supabase
//         .from('courses')
//         .select('*')
//         .order('created_at', { ascending: false });
//       if (error) {
//         console.error(error);
//       } else {
//         setCourses(data || []);
//       }
//       setLoading(false);
//     }
//     load();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-3xl font-semibold mb-6">Courses</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : courses.length === 0 ? (
//         <p>No courses yet. Add some from Supabase dashboard.</p>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {courses.map((c) => (
//             <article key={c.id} className="border rounded p-4">
//               <h3 className="font-semibold text-xl">{c.title}</h3>
//               <p className="text-sm mt-2">{c.description}</p>
//             </article>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// src/app/courses/page.tsx (Server Component by default)

import { supabase } from '@/lib/supabaseClient'; // server-side client

export default async function CoursesPage() {
  const { data: courses } = await supabase.from("courses").select("*");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <ul className="space-y-4">
        {courses?.map((course) => (
          <li key={course.id} className="p-4 border rounded">
            <h2 className="text-xl">{course.title}</h2>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
