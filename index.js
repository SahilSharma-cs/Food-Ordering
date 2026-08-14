
import {menuArray} from "./data.js"

const menuContainer = document.getElementById('menu-container')
const orderCart = document.getElementById('order-cart')
const totalValueEl = document.getElementById('total-value-el')
const payBtn = document.getElementById('pay-btn')
const paymentForm = document.getElementById('payment-form')
const orderBtn = document.getElementById('order-btn')
const modalOverlay = document.getElementById('modal-overlay')
const totalOrderContainer = document.getElementById('total-order-container')


let orderArray = []


document.addEventListener('click',function(e){
    if(e.target.dataset.id){
        purchaseClick(e.target.dataset.id)
    }
    if(e.target.dataset.delete){
        deleteClick(e.target.dataset.delete)
    }
})

orderBtn.addEventListener('click',function(){
    setTimeout(function(){
        modalOverlay.style.display = 'flex'
    },500)
})
paymentForm.addEventListener('submit',function(e){
        e.preventDefault();
        modalOverlay.style.display = 'none'
        const formdata = new FormData(e.target)
        const fullName = formdata.get('fullName') 
        totalOrderContainer.innerHTML = `<h2 class='payment-complete'>Thanks, ${fullName}! Your order is on its way!</h2>`
        totalOrderContainer.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    })
    orderArray = []
    paymentForm.reset()
})


function purchaseClick(orderId){
    const targetObj = menuArray.filter(function(menu){
        return menu.id === Number(orderId)
    })[0]
    const orderItem = {
        ...targetObj,
        qty:1,
    }
    const existingItem = orderArray.find(order =>{
        return order.id === Number(orderId)
    })
    if(existingItem){
        existingItem.qty++
    }else{
    orderArray.push(orderItem)
    }
    renderOrder()

}

function deleteClick(deleteId){
    const index = orderArray.findIndex(order=>order.id===Number(deleteId))
    if(index!==-1){
        orderArray.splice(index,1)
    }
    renderOrder()

}

function getTotalValue(arr){
    const totalPrice = arr.reduce((total,current)=>{
        return total + current.price * current.qty
    },0)
    return totalPrice
    
}

function GetOrderHtml(arr){
    return arr.map(item=>{
        return `<div class="order-wrapper">
                    <div class="order-item">
                        <h3>${item.name}<span class="item-qty">(${item.qty})</span></h3>
                        <button class="remove-btn" data-delete="${item.id}">remove</button>
                    </div>
                    <h4>${item.price * item.qty}$</h4>
                </div>`
    }).join("")
}



 function renderOrder(){
    orderCart.innerHTML = GetOrderHtml(orderArray)
    totalValueEl.textContent = getTotalValue(orderArray) + "$"
 }




function getFeedHtml(){
    return menuArray.map(item => {
        return `
                <div class="menu-wrapper">
                    <div class="item-container">
                        <h2 class="item-img">${item.emoji}</h2>
                        <div class="item-inner">
                            <h3>${item.name}</h3>
                            <p>${item.ingredients}</p>
                            <h4>${item.price}$</h4>
                        </div>
                    </div>
                    <button class="circle-plus" data-id=${item.id}>+</button>
                </div>`
    }).join("")
}

menuContainer.innerHTML = getFeedHtml()