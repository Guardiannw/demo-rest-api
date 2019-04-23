const list = document.querySelector('h2+ul');

fetch('/users').then((res) => res.json())
    .then((users) => {
        for (const user of users)
            list.insertAdjacentHTML('beforeend', `<li data-user-id=${user.id}>${JSON.stringify(user)} <button data-button-type="remove" type="button">Remove</button></li>`);
    });

list.addEventListener('click', (event) => {
    const srcElement = event.srcElement;

    const button = srcElement;
    const attribute = srcElement.attributes["data-button-type"];

    if (button && attribute && attribute.value === "remove") {
        const li = button.parentElement;
        const userId = li.attributes["data-user-id"].value;

        deleteUser(userId);
    }
});

function deleteUser(userId) {
    // Send the request
    fetch(`/users/${userId}`, {
        method: 'DELETE'
    }).then(() => {
        // Remove the user from the list, because it was removed on the server.
        const li = document.querySelector(`[data-user-id="${userId}"]`);
        li.remove();
    }, (err) => {
        alert(`Error: ${err}`);
    });
}