const {Observable, filter} = require('rxjs')

const myPromise = new Promise(resolve => {
    setTimeout(()=>{
        resolve('ok')
        resolve('ok2')
}, 1000)
})


myPromise.then(rs => console.log(rs))

const myObservable = new Observable(observer =>{
    setTimeout(()=>{
        observer.next('ok')
        observer.next('ok2')
}, 1000)

})
myObservable.pipe(
    filter(filter => filter === 'ok')
).subscribe(result => {console.log(result)})