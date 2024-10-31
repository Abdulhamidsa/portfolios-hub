describe('show excecution order', () => {
    console.log('describe outer-a')

    test('test 2', () => {
        console.log('test 2')
        expect(1).toBe(1)
    })

    describe('describe inner 2', () => {
        console.log('describe inner 2')

        test('test 3', () => {
            console.log('test 3')
            expect(1).toBe(1)
        })
    })

    console.log('describe outer-c')
})

const testDelay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
