pipeline {
    agent { label 'nodejs-agent' }

    environment {
        DOCKER_IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
        DOCKER_IMAGE_TAG_LATEST = "${env.BRANCH_NAME}-latest"
    }

    stages {
        stage('Install npm dependencies') {
            steps {
                cache(defaultBranch: 'dev',
                  maxCacheSize: 2048,
                  caches: [
                    arbitraryFileCache(
                        path: "node_modules",
                        includes: "**/*",
                        cacheValidityDecidingFile: "package-lock.json"
                    )
                  ]) {
                    sh "npm install"
                }
            }
        }

        stage('Run automation tests') {
            steps {
                sh 'npm run test:coverage'
            }
            post {
                always {
                    recordCoverage(tools: [[parser: 'COBERTURA', pattern: '**/cobertura-coverage.xml']])
                    junit allowEmptyResults: true, checksName: 'Unit Tests', stdioRetention: 'FAILED', testResults: 'junit.xml'
                }
            }
        }

        stage('Build and Push Docker Image') {
            agent { label 'docker-agent' }
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                    branch 'dev'
                    branch 'prod'
                }
            }
            steps {
              script {
                  def image = docker.build("deriabin/altzone-api:${DOCKER_IMAGE_TAG}")
                  image.push()
                  image.push("${DOCKER_IMAGE_TAG_LATEST}")
              }

//                 withCredentials([string(credentialsId: 'alt-docker-image', variable: 'IMAGE_NAME_PREFIX')]) {
//                     script {
//                         def imageName = env.IMAGE_NAME_PREFIX + "-api"
//                         def imageTag = env.BRANCH_NAME + "-" + env.BUILD_NUMBER
//                         def image = docker.build("${imageName}:${imageTag}")
//                         image.push()
//                         image.push("${env.BRANCH_NAME}-latest")
//                     }
//                 }
            }
        }
    }
}
