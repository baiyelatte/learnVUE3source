function handleThen(result, newPromise, resolve, reject) {
    if (result === newPromise) {
        throw new Error('can not oneself')
    }
    resolve(result)
}
class MyPromise {
    state = 'pending'
    resolve = undefined
    reqson = undefined
    resolveArr = []
    rejectArr = []
    constructor(excution) {
        const resolve = (result) => {
            if (this.state === 'pending') {
                this.state = 'resolve'
                this.resolve = result
                this.resolveArr.forEach(fn => fn())
            }
        }
        const reject = (reqson) => {
            if (state === 'pending') {
                this.state = 'reject'
                this.reqson = reqson
                this.rejectArr.forEach(fn => fn())
            }
        }
        excution(resolve, reject)
    }
    then(onResolve, onReject) {
        const newPromise = new MyPromise((myResolve, myReject) => {
            if (this.state === 'resolve') {
                setTimeout(() => {
                    const result = onResolve(this.resolve)
                    handleThen(result, newPromise, myResolve, myReject)
                });
            }
            if (this.state === 'reject') {
                setTimeout(() => {
                    const result = onReject(this.reqson)
                    handleThen(result, newPromise, myResolve, myReject)
                });
            }
            if (this.state === 'pending') {
                this.resolveArr.push(() => { onResolve(this.resolve) })
                this.rejectArr.push(() => { onReject(this.resolve) })
            }
        })
        return newPromise
    }
}
