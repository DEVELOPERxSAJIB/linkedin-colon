// get elements
const post_add_form = document.getElementById('post_add_form');
const msg = document.querySelector('.msg');
const all_post = document.querySelector('.all-post');
const post_update_form = document.getElementById('post_update_form');

// get all post 
const getAllPost = () => {
    // get data form LS
    let data = readLSData('product');

    // check LS Data exists
    if (!data) {
        all_post.innerHTML = `<p class="text-center">No Post Found</p>`
        return false;
    }

    // show LS Data if exists
    if (data) {
         // init value
        let list = '';

        // loop for data
        data.reverse().map((item) => {
            list += `
            
                <div class="post-timeline-area">
                <div class="card shadow-sm pt-3 mb-3 border-ofcard">
                    <div class="card-body mx-3">
                        <div class="post-auth-area">
                            <div class="user-info">
                                <img src="${item.aphoto}" alt="">
                                <div class="details">
                                    <p class="d-block" style="font-weight: bold; margin-top: -3px;">${item.aname}</p>
                                    <span class="d-block">2h . <i class="fas fa-globe-americas"></i></span>
                                </div>
                            </div>
                            <div class="dropdown">
                                <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item product-edit" data-bs-toggle="modal" product_index=${item.index} href="#linkedin_edit_modal">Edit</a></li>
                                <li><a class="dropdown-item delete-post" href="#" post_id=${item.id}>Delete</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="post-content-area mt-3">
                            <p>${item.pcontent}</p>
                        </div>
                    </div>
                    <img class="w-100" src="${item.pphoto}" alt="">
                </div>
            </div>
            
            `
        });

        all_post.innerHTML = list;

    }
}

getAllPost();


// validation form
post_add_form.onsubmit = (e) => {
    e.preventDefault();

    // form data get
    let form_data = new FormData(e.target);
    let getPost = Object.fromEntries(form_data.entries());
    let {aname, aphoto, pcontent, pphoto, location} = Object.fromEntries(form_data.entries());

    // Create random ID
    let randID = Math.floor(Math.random() * 1000) + '_' + Date.now();

    // validation msg 
    if (!aname || !aphoto || !pcontent || !pphoto){
        msg.innerHTML = setAlert('All feilds are required');
    } else {
        createLSData('product', {...getPost, id : randID});
        e.target.reset();
        getAllPost();
    }
}

// Delete Post
all_post.onclick = (e) => {
    e.preventDefault();

    if(e.target.classList.contains('delete-post')){
        // get post ID
        const postID = e.target.getAttribute('post_id');

        // get all post 
        const posts = readLSData('product');

        // delete data array
        const delete_data = (posts.filter(data => data.id !== postID));

        // now update all post
        confirm('Are You Sure to Delete this Post?')
        uploadLSData('product', delete_data);
        getAllPost();
    }

    if (e.target.classList.contains('product-edit')){

        // Single Product Edit
        let index = e.target.getAttribute('product_index');

        // get product value
        let data = readLSData('product');
        const {name, price, quantity, photo} = data[index];

        // value set into product_update_form
        post_update_form.innerHTML = `
            
                <div class="msg"></div>
                <div class="mt-3">
                    <label for="">Name</label>
                    <input name="name" value="${name}" type="text" class="form-control">
                </div>
                <div class="mt-3">
                    <label for="">Price</label>
                    <input name="price" value="${price}" type="text" class="form-control">
                </div>
                <div class="mt-3">
                    <label for="">Quantity</label>
                    <input name="quantity" value="${quantity}" type="text" class="form-control">
                </div>
                <div class="mt-0">
                    <label class="text-center" for="">Previous Photo</label>
                    <img class="w-100" src="${photo}" alt="">
                </div>
                <div class="mt-3">
                    <label for="">Photo</label>
                    <input name="photo" value="${photo}" type="text" class="form-control">
                </div>
                <div class="mt-3">
                    <input name="submit" type="submit" value="Update Now" class="form-control boton">
                </div>
        `;
    }
}
