function searchClient() {
    const searchValue = document.getElementById('searchCode').value.trim().toLowerCase();
    const clients = JSON.parse(localStorage.getItem('clients')) || [];

    const filteredClients = clients.filter(client => 
        client.code && client.code.toLowerCase().includes(searchValue)
    );

    loadClients(filteredClients);
}


function loadClients(clients = null) {
    const data = clients || JSON.parse(localStorage.getItem('clients')) || [];
    const tbody = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    data.forEach((client) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${client.code}</td>
            <td>${client.name}</td>
            <td>${client.phone}</td>
            <td>${client.country}</td>
            <td>${client.to}</td>
            <td>${client.driver}</td>
            <td>${client.arrivalDate}</td>
            <td>${client.departureDate}</td>
            <td>
                <button onclick="editClient('${client.code}')">Edit</button>
                <button onclick="deleteClient('${client.code}')">Delete</button>
            </td>
        `;
    });
}

function searchOnEnter(event) {
    if (event.key === 'Enter') {
        searchClient();
    }
}

function editClient(code) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const client = clients.find(c => c.code === code);

    document.getElementById('clientCode').value = client.code;
    document.getElementById('clientName').value = client.name;
    document.getElementById('clientPhone').value = client.phone;
    document.getElementById('clientCountry').value = client.country;
    document.getElementById('clientTo').value = client.to;
    document.getElementById('driverName').value = client.driver;
    document.getElementById('arrivalDate').value = client.arrivalDate;
    document.getElementById('departureDate').value = client.departureDate;

    const submitButton = document.querySelector("button[type='submit']");
    submitButton.textContent = 'Update Client';
    submitButton.onclick = function() {
        updateClient(code);
    };
}

function updateClient(code) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const updatedClient = {
        code: document.getElementById('clientCode').value,
        name: document.getElementById('clientName').value,
        phone: document.getElementById('clientPhone').value,
        country: document.getElementById('clientCountry').value,
        to: document.getElementById('clientTo').value,
        driver: document.getElementById('driverName').value,
        arrivalDate: document.getElementById('arrivalDate').value,
        departureDate: document.getElementById('departureDate').value,
    };

    const index = clients.findIndex(client => client.code === code);
    if (index !== -1) {
        clients[index] = updatedClient;
        localStorage.setItem('clients', JSON.stringify(clients));
    }

    document.getElementById('clientForm').reset();
    loadClients();

    const submitButton = document.querySelector("button[type='submit']");
    submitButton.textContent = 'Add Client';
    submitButton.onclick = null;
}

function deleteClient(code) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];

    // التأكد من طلب تأكيد الحذف
    const confirmation = window.confirm("هل أنت متأكد أنك تريد حذف هذا العميل؟");
    if (confirmation) {
        // إذا وافق المستخدم على الحذف، يتم إزالة العميل
        const updatedClients = clients.filter(client => client.code !== code);
        localStorage.setItem('clients', JSON.stringify(updatedClients));

        // إعادة تحميل البيانات بعد الحذف
        loadClients();
    }
}




document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const client = {
        code: document.getElementById('clientCode').value,
        name: document.getElementById('clientName').value,
        phone: document.getElementById('clientPhone').value,
        country: document.getElementById('clientCountry').value,
        to: document.getElementById('clientTo').value,
        driver: document.getElementById('driverName').value,
        arrivalDate: document.getElementById('arrivalDate').value,
        departureDate: document.getElementById('departureDate').value,
    };

    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push(client);
    localStorage.setItem('clients', JSON.stringify(clients));
    document.getElementById('clientForm').reset();
    loadClients();
});

window.onload = () => {
    loadClients();
};

function searchByDate() {
    const searchDate = document.getElementById('searchDate').value;
    const clients = JSON.parse(localStorage.getItem('clients')) || [];

    const filteredClients = clients.filter(client => client.arrivalDate === searchDate);
    loadClients(filteredClients);
}


function loadClients(clients = null) {
    const data = clients || JSON.parse(localStorage.getItem('clients')) || [];
    const tbody = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    // ترتيب العملاء حسب تاريخ الوصول (من الأقرب إلى الأبعد)
    data.sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate));

    data.forEach((client) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${client.code}</td>
            <td>${client.name}</td>
            <td>${client.phone}</td>
            <td>${client.country}</td>
            <td>${client.to}</td>
            <td>${client.driver}</td>
            <td>${client.arrivalDate}</td>
            <td>${client.departureDate}</td>
            <td>${client.comment}</td> <!-- عرض التعليق -->
            <td>
                <button onclick="editClient('${client.code}')">Edit</button>
                <button onclick="deleteClient('${client.code}')">Delete</button>
            </td>
        `;
    });
}

document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const client = {
        code: document.getElementById('clientCode').value,
        name: document.getElementById('clientName').value,
        phone: document.getElementById('clientPhone').value,
        country: document.getElementById('clientCountry').value,
        to: document.getElementById('clientTo').value,
        driver: document.getElementById('driverName').value,
        arrivalDate: document.getElementById('arrivalDate').value,
        departureDate: document.getElementById('departureDate').value,
        comment: document.getElementById('clientComment').value // حفظ التعليق
    };

    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push(client);
    localStorage.setItem('clients', JSON.stringify(clients));
    document.getElementById('clientForm').reset();
    loadClients();
});

function editClient(code) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const client = clients.find(c => c.code === code);

    document.getElementById('clientCode').value = client.code;
    document.getElementById('clientName').value = client.name;
    document.getElementById('clientPhone').value = client.phone;
    document.getElementById('clientCountry').value = client.country;
    document.getElementById('clientTo').value = client.to;
    document.getElementById('driverName').value = client.driver;
    document.getElementById('arrivalDate').value = client.arrivalDate;
    document.getElementById('departureDate').value = client.departureDate;
    document.getElementById('clientComment').value = client.comment; // تحميل التعليق عند التعديل

    const submitButton = document.querySelector("button[type='submit']");
    submitButton.textContent = 'Update Client';
    submitButton.onclick = function() {
        updateClient(code);
    };
}

function updateClient(code) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const updatedClient = {
        code: document.getElementById('clientCode').value,
        name: document.getElementById('clientName').value,
        phone: document.getElementById('clientPhone').value,
        country: document.getElementById('clientCountry').value,
        to: document.getElementById('clientTo').value,
        driver: document.getElementById('driverName').value,
        arrivalDate: document.getElementById('arrivalDate').value,
        departureDate: document.getElementById('departureDate').value,
        comment: document.getElementById('clientComment').value // تحديث التعليق
    };

    const index = clients.findIndex(client => client.code === code);
    if (index !== -1) {
        clients[index] = updatedClient;
        localStorage.setItem('clients', JSON.stringify(clients));
    }

    document.getElementById('clientForm').reset();
    loadClients();

    const submitButton = document.querySelector("button[type='submit']");
    submitButton.textContent = 'Add Client';
    submitButton.onclick = null;
}

function deleteClient(code) {
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients = clients.filter(client => client.code !== code);
    localStorage.setItem('clients', JSON.stringify(clients));
    loadClients();
}

// تحميل البيانات عند تحميل الصفحة
window.onload = () => {
    loadClients();
};
