pipeline {
    agent any
    stages {
        stage('git clone frontend') {
            steps {
                git url: 'https://github.com/imshukla12/E_RaktKendra_frontend.git' , branch: 'main'
                echo 'Project is cloned'
            }
        }
      stage('Build') {
            steps {
                sh 'npm install'
                echo 'npm build completed'
            }
        }
//       stage('Docker Build Image') {
//              steps {
//                   echo 'creating docker image'
//                   sh 'docker build -t eraktkendra_security_frontend .'
//                   echo 'docker image created'
//             }
//         }
//       stage('Push Docker Image to Docker Hub') {
//               steps {
//                         echo 'docker tag'
//                         sh 'docker tag eraktkendra_security_frontend imshukla/eraktkendra_security_frontend:latest'
//                         echo 'pushing image to docker hub'
//                         withDockerRegistry([ credentialsId: "docker-cred", url: "" ]){
//                         sh 'docker push imshukla/eraktkendra_security_frontend'
//                     }
//               }
//       }
    //   stage('Ansible Pull Docker Image') {
    //               steps {
    //                   ansiblePlaybook becomeUser: null,
    //                   colorized: true,
    //                   disableHostKeyChecking: true,
    //                   installation: 'Ansible',
    //                   inventory: 'inventory',
    //                   playbook: 'playbook.yml',
    //                   sudoUser: null
    //               }
    //   }
    }
}
