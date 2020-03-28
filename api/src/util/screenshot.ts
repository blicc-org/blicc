import Nightmare from 'nightmare'

export class Screenshot {
  public static capture(): void {
    new Nightmare()
      .goto('https://google.com')
      .screenshot('./screenshots/test.png')
      .end()
      .then(function(result) {
        return 'Screenshot Done'
      })
      .catch(function(error) {
        console.error(error)
      })
  }
}
