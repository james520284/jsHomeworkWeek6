

// 取得插入程式碼位置
const ticketCardArea = document.querySelector('.ticketCard-area');

// 取得資料庫
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
.then(function (response) {


const originData = response.data.data;

// 1.渲染套票
function renderData(data) {
    let str = '';
    data.forEach(function (item) {
        str += `<li class="ticketCard">
            <div class="ticketCard-img">
            <a href="#">
                <img src="${item.imgUrl}" alt="">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
            <div>
                <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                ${item.description}
                </p>
            </div>
            <div class="ticketCard-info">
                <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                </p>
                <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
            </div>
            </div>
        </li>`;
    });

    // 插入程式碼
    ticketCardArea.innerHTML = str;
};
renderData(originData);

// 2.篩選套票
//取得篩選按鈕
const regionSearch = document.querySelector('.regionSearch');
//監聽篩選按鈕
regionSearch.addEventListener('change',function () {
//建立一個篩選資料庫
let dataFilter = [];
originData.forEach(function (item) {
    if (item.area === regionSearch.value) {
        dataFilter.push(item);
    } else if(!regionSearch.value){
        dataFilter.push(item);
    }
});
//篩選無資料時建立預設畫面
const cantFindArea = document.querySelector('.cantFind-area');
if (dataFilter.length == 0) {
    cantFindArea.style.display = 'block';
}else{
    cantFindArea.style.display = 'none';
}
//取得並改變篩選筆數
const searchResultText = document.querySelector('#searchResult-text');
searchResultText.textContent = `本次搜尋共 ${dataFilter.length} 筆資料`;
//渲染篩選資料庫
renderData(dataFilter);
});

// 3.新增套票
//取得input欄位
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');
const addTicketBtn = document.querySelector('.addTicket-btn');
let newData = {};
// 監聽新增按鈕
addTicketBtn.addEventListener('click',function (e) {
    // 建立新資料
    newData = {
        area:ticketRegion.value.trim(),
        description:ticketDescription.value.trim(),
        group:Number(ticketNum.value.trim()),
        id:originData.length,
        imgUrl:ticketImgUrl.value.trim(),
        name:ticketName.value.trim(),
        price:Number(ticketPrice.value.trim()),
        rate:Number(ticketRate.value.trim())
    }
    // 驗證欄位
    let errorMsg="";
    if (!newData.name) {
    errorMsg = "套票名稱為必填!";
    } else if (!newData.imgUrl) {
    errorMsg = "圖片網址為必填!";
    } else if (!newData.area) {
    errorMsg = "請選擇地區!";
    } else if (newData.price <= 0) {
    errorMsg = "套票金額必須大於 0!";
    } else if (newData.group < 1) {
    errorMsg = "套票組數必須至少為 1!";
    } else if (newData.rate < 1 || newData.rate > 10) {
    errorMsg = "套票星級必須在 1 至 10 之間!";
    } else if (newData.description.length > 100) {
    errorMsg = "套票描述必填，且不能超過 100 字!";
    }
    
    if (errorMsg) {
        alert(errorMsg);
        return;
    }
    // 驗證正確後推送資料
    originData.push(newData);

    // 重新渲染套票
    renderData(originData);
    console.log(originData);
    
    // 清空欄位
    const addTicketForm = document.querySelector('.addTicket-form');
    addTicketForm.reset();

    // 篩選器回到預設
    regionSearch.value = '';

});

});

