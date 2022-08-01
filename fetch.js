document.addEventListener('DOMContentLoaded', loadAPI2);
document.addEventListener('DOMContentLoaded', fetchApi);


// function loadAPI(){
//     const spinner =  document.getElementById('spinner');
//     spinner.style.display = 'block';
//             // setTimeout(() => {       
//             //         //hide the spinner
//                 // spinner.style.display = 'none';
//             // }, 8000);

//   fetch('https://picsum.photos/list')
//     .then(response => {
//        console.log(response); 
//        spinner.style.display = 'none';
//        return response.json()
       
//     })
//     .then(images => {
//         let html = '';

//         images.forEach(image => {
//             html += `
//                 <li>
//                     <a target="_blank" href="${image.post_url}">View Image</a>
//                     ${image.author} 
//                 </li>
//             `;
//         });
//         document.getElementById('fetch').innerHTML = html;
//     })
//     .catch(error => console.log(error) )

// }

async function fetchApi(e){
    e.preventDefault();
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    const myInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'text/xml',
        },
        mode: 'cors',
        cache: 'default',
    };

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', myInit);
    spinner.style.display = 'none';
    const error = true;
    console.log(response);

    if (!error) {
        const data = await response.json();
        console.log(data);

        // alert("Request completed successfully");
        const modal =  document.getElementById('modalBtn');
        modal.click();

        let html = '';

        data.forEach(post => {
            html += `
                <li>
                    ${post.id} - ${post.title}
                </li>
            `;
        });
        document.getElementById('api').innerHTML = html;
    } else {
        // alert("Request could not be processed at the moment");
        const errorModal =  document.getElementById('errorModalBtn');
        errorModal.click();
    }
}


async function loadAPI2(e) {
    e.preventDefault();
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
        
    
    const response = await fetch('https://picsum.photos/list');
    spinner.style.display = 'none';
   

    if (response.status == 200) {
        const data = await response.json();
        console.log(data);

        // alert("Request completed successfully");
        const modal =  document.getElementById('modalBtn');
        modal.click();

        let html = '';

        data.forEach(image => {
            html += `
                <li>
                    <a target="_blank" href="${image.post_url}">View Image</a>
                    ${image.author} 
                </li>
            `;
        });
        document.getElementById('fetch').innerHTML = html;
    } else {
        // alert("Request could not be processed at the moment");
        const errorModal =  document.getElementById('errorModalBtn');
        errorModal.click();
    }
}

// loadAPI()
//     .then(api => console.log(api) )
//     .catch(error => console.log(error) );
