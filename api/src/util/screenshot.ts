import Nightmare from 'nightmare'

export class Screenshot {
  public static capture(): void {
    new Nightmare()
      .goto('https://google.com')
      .screenshot('./screenshots/test.png')
      .end()
      .then(() => {
        return 'Screenshot Done'
      })
      .catch(error => {
        console.error(error)
      })
  }
}
