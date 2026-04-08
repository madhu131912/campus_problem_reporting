let reports = JSON.parse(localStorage.getItem('reports')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'Admin' }
];

function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function register() {
  const name = document.getElementById('regName').value.trim();
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value;
  const studentId = document.getElementById('regStudentId').value.trim();

  if (!name || !username || !password || !studentId) {
    alert('Please fill all fields');
    return;
  }

  if (users.find(u => u.username === username)) {
    alert('Username already exists!');
    return;
  }

  users.push({
    username,
    password,
    role: 'student',
    name,
    studentId
  });

  localStorage.setItem('users', JSON.stringify(users));
  alert('Account created! Please login.');
  showLogin();

  document.querySelectorAll('#registerForm input').forEach(input => input.value = '');
}

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const user = users.find(
    u => u.username === username && u.password === password && u.role === role
  );

  if (!user) {
    alert('Invalid credentials!');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(user));

  document.getElementById('authSection').style.display = 'none';

  if (role === 'admin') {
    document.getElementById('adminSection').style.display = 'block';
    renderProblems();
  } else {
    document.getElementById('dashboardSection').style.display = 'block';
    updateStats();
    renderProblems();
  }
}

function logout() {
  localStorage.removeItem('currentUser');

  document.querySelectorAll('section').forEach(sec => {
    sec.style.display = 'none';
  });

  document.getElementById('authSection').style.display = 'flex';
}

function updateStats() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userReports = reports.filter(r => r.studentId === currentUser.studentId);

  document.getElementById('total').textContent = userReports.length;
  document.getElementById('pending').textContent = userReports.filter(r => r.status === 'Pending').length;
  document.getElementById('resolved').textContent = userReports.filter(r => r.status === 'Resolved').length;
}

function submitProblem() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser || currentUser.role !== 'student') {
    alert('Please login as student');
    return;
  }

  const name = document.getElementById('name').value.trim();
  const location = document.getElementById('location').value.trim();
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value.trim();
  const file = document.getElementById('image').files[0];

  if (!name || !location || !description) {
    alert('Please fill all fields');
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    reports.unshift({
      id: Date.now(),
      name,
      location,
      category,
      description,
      image: reader.result || null,
      status: 'Pending',
      date: new Date().toISOString(),
      studentId: currentUser.studentId
    });

    localStorage.setItem('reports', JSON.stringify(reports));
    alert('Problem submitted successfully!');

    document.querySelectorAll('#reportSection input, #reportSection textarea').forEach(el => el.value = '');

    updateStats();
    renderProblems();
  };

  if (file) reader.readAsDataURL(file);
  else reader.onload();
}

function renderProblems() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

  const list = document.getElementById('list');
  const solvedList = document.getElementById('solvedList');
  const adminList = document.getElementById('adminList');

  if (list) {
    const pendingReports = reports.filter(
      r => r.status === 'Pending' && r.studentId === currentUser.studentId
    );

    list.innerHTML = pendingReports.length
      ? pendingReports.map(report => problemHTML(report)).join('')
      : '<p>No pending problems</p>';
  }

  if (solvedList) {
    const solvedReports = reports.filter(
      r => r.status === 'Resolved' && r.studentId === currentUser.studentId
    );

    solvedList.innerHTML = solvedReports.length
      ? solvedReports.map(report => problemHTML(report, true)).join('')
      : '<p>No solved problems</p>';
  }

  if (adminList) {
    const pendingAll = reports.filter(r => r.status === 'Pending');

    adminList.innerHTML = pendingAll.length
      ? pendingAll.map(report => `
        <div class="problem">
          ${problemHTML(report)}
          <button onclick="resolveProblem(${report.id})">Resolve</button>
        </div>
      `).join('')
      : '<p>No pending problems</p>';
  }
}

function problemHTML(report, solved = false) {
  return `
    <div class="problem">
      <b>${escapeHtml(report.category)}</b><br>
      <strong>${escapeHtml(report.name)}</strong> | ${escapeHtml(report.location)}<br>
      ${escapeHtml(report.description)}<br>
      ${report.image ? `<img src="${report.image}" alt="Problem">` : ''}
      ${solved ? '<span style="color:green;">✓ Resolved</span>' : ''}
    </div>
  `;
}

function resolveProblem(id) {
  const report = reports.find(r => r.id === id);
  if (!report) return;

  report.status = 'Resolved';
  localStorage.setItem('reports', JSON.stringify(reports));

  renderProblems();
  updateStats();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    document.getElementById('authSection').style.display = 'flex';
    return;
  }

  document.getElementById('authSection').style.display = 'none';

  if (currentUser.role === 'admin') {
    document.getElementById('adminSection').style.display = 'block';
  } else {
    document.getElementById('dashboardSection').style.display = 'block';
    updateStats();
  }

  renderProblems();
});