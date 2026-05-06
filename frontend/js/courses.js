fetch('/api/courses')
  .then(res => res.json())
  .then(courses => {
    const catalog = document.getElementById('course-catalog');
    courses.forEach(course => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.category}</p>
        <p>${course.duration}</p>
        <p>PKR ${course.price}</p>
        <a href="course-details.html?id=${course.id}">View</a>
      `;
      catalog.appendChild(div);
    });
  });
