const api = async (searchText, showMore) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const theData = data.data
    theDataLooping(theData, showMore)
};


const theDataLooping = (theData, showMore) => {
    const theParent = document.getElementById('parent')
    theParent.textContent = ''
    const showBtn = document.getElementById('show-btn')
    if (theData.length > 12 && !showMore) {
        showBtn.classList.remove('hidden')
    } else {
        showBtn.classList.add('hidden')
    }
    console.log('the button is working perfectly', showMore)
    if (!showMore) {
        theData = theData.slice(0, 12)
    }


    theData.forEach(phone => {

        const create1 = document.createElement('div')
        create1.classList = ' card bg-aqua-400 shadow-xl'
        create1.innerHTML = `
                        <figure class="px-10 pt-10">
                          <img
                            src="${phone.image}"
                            alt="Shoes"
                            class="rounded-xl" />
                        </figure>
                        <div class="card-body items-center text-center">
                          <h2 class="card-title">${phone.phone_name}</h2>
                          <p>If a dog chews shoes whose shoes does he choose?</p>
                          <div class="card-actions">
                            <button onclick="theInteractions('${phone.slug}')" class="btn btn-primary">Show Details</button>
                          </div>
                        </div>
        `
        theParent.appendChild(create1)
    })
    spinnerOperation(false);
}


const theSearchBar = (showMore) => {
    spinnerOperation(true);
    const searchText1 = document.getElementById('input-value')
    const searchText = searchText1.value
    // console.log(searchText)
    api(searchText, showMore);
}


const showBtnOperation = () => {
    theSearchBar(true);
}

const spinnerOperation = (loading) => {
    const spinnerId = document.getElementById('spinner')
    if (loading) {
        spinnerId.classList.remove('hidden')
    } else {
        spinnerId.classList.add('hidden')
    }
}

const theInteractions = async (id) => {
    const resource = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await resource.json()
    const dataS = data.data
    console.log(dataS)
    finalModalOperation(dataS)
}

const finalModalOperation = (dataS) => {
    // const modalHead = document.getElementById('data-head')
    // modalHead.innerText = `${dataS.name}`
    // const pid = document.getElementById('p-id')
    // pid.innerText = `${dataS.brand}`
    const id = document.getElementById('modal-container');
    id.innerHTML = `
    <img  src='${dataS.image}'>
    <h3>${dataS.name}</h2>
    <p><span>Brand :</span> ${dataS.brand}</p>
     <p><span>Storage :</span> ${dataS?.mainFeatures?.storage}</p>
     <p><span>GPS :</span> ${dataS?.others?.GPS || 'No'}</p>
     <p><span>Release Date :</span> ${dataS?.releaseDate}</p>
    `
    my_modal_1.showModal()
}


// Alhamdulillah done succesfully

'Allah is almighty'