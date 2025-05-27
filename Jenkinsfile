pipeline {
    agent { label 'nodejs-agent' }

    stages {
        stage('For bug branches') {
            when {
                branch "bug/*"
            }
            steps {
                echo 'This only runs on bug branches!'
            }
        }

        stage('PR checks') {
            when {
                branch 'PR-*'
            }
            steps {
                echo 'Run unit tests'

                script {
                    def npmStatus = sh(script: 'npm install', returnStatus: true)
                    if (npmStatus != 0) {
                        publishChecks name: 'Jest Tests',
                          title: 'Dependency Installation Failed',
                          summary: '❌ npm install failed',
                          text: '`npm install` failed. Please verify your `package.json` and lock files.',
                          status: 'COMPLETED',
                          conclusion: 'FAILURE'
                        error("Stopping pipeline due to npm install failure")
                    }

                    def testsStatus = sh(script: 'npm run test', returnStatus: true)
                    if (testsStatus != 0) {
                        publishChecks name: 'Jest Tests',
                          title: 'Test Failures',
                          summary: '❌ Unit tests failed',
                          text: 'One or more tests failed. Check the Jenkins logs for details.',
                          status: 'COMPLETED',
                          conclusion: 'FAILURE'
                    } else {
                        publishChecks name: 'Jest Tests',
                          title: 'All Tests Passed',
                          summary: '✅ Jest tests successful',
                          text: 'All unit tests passed.',
                          status: 'COMPLETED',
                          conclusion: 'SUCCESS'
                    }
                }
            }
        }
    }
}
