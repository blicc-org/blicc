import React from 'react'
import { Highlighter } from '../../components/syntax-highlighting/Highlighter'
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'

export function HostYourOwn() {
  const text = `
  #!/bin/sh

  ## install docker
  sudo apt update
  sudo apt install apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
  sudo apt update
  apt-cache policy docker-ce
  sudo apt install docker-ce
  
  ## install docker compose
  sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  
  # create docker network
  docker network create web
  
  # setup basic firewall
  ufw allow OpenSSH
  sudo ufw allow http
  sudo ufw allow https
  sudo ufw allow 8080
  ufw enable
  ufw status
  `

  return (
    <>
      <Header />
      <main role="main">
        <div className="container py-5">
          <Highlighter language="jsx" value={text} />
        </div>
      </main>
      <Footer />
    </>
  )
}
