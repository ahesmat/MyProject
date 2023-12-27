pipeline {
    agent any
    

     stages {
      
        

        stage('Terraform Init') {
            
            steps {
                script {
                    def tfHome = tool name: 'MyTerraform'
                    // Change the working directory for the 'terraform init' command
                    dir('/var/jenkins_home/myProject/Terraform') {
                        withCredentials([[
                            $class: 'AmazonWebServicesCredentialsBinding',
                            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                            credentialsId: 'AWS Login',
                            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY',
                        ]]) {
                            sh "${tfHome}/terraform init -input=false"
                        }
                    }
                }
            }
        }

        stage('Terraform Apply') {
            
            steps {
                
                script {
                    def tfHome = tool name: 'MyTerraform'
                    // Change the working directory for the 'terraform apply' command
                    dir('/var/jenkins_home/myProject/Terraform') {
                        withCredentials([[
                            $class: 'AmazonWebServicesCredentialsBinding',
                            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                            credentialsId: 'AWS Login',
                            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY',
                        ]]) {
                            sh "${tfHome}/terraform apply -auto-approve"
                        }
                    }
                }
            }
        }
        stage('Terraform Output') {
             
            steps {
            
                script {
                    def tfHome = tool name: 'MyTerraform'
                    // Change the working directory for the 'terraform init' command
                    dir('/var/jenkins_home/myProject/Terraform') {
                        withCredentials([[
                            $class: 'AmazonWebServicesCredentialsBinding',
                            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                            credentialsId: 'AWS Login',
                            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY',
                        ]]) {
                            sh "${tfHome}/terraform output public_ip > Instance_public_IP"
                            sh "${tfHome}/terraform output private_key > private_key.pem"
                            sh "chmod 600 private_key.pem"
                            //sh 'cat Instance_publice_IP | awk -F"\"" \'{print "ssh -i private_key.pem ubuntu@"$2}\'>Instance_access_script'
                             sh './create_login_script.sh'
                            //sh 'chmod 777 Instance_access_script'
                        }
                    }
                }
            }
        }

    

}
