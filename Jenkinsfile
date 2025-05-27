pipeline {
    agent { label 'nodejs-agent' }

    stages {
        stage('For bug branches') {
            when {
                branch "bug/*"
            }
            steps {      
                echo 'This only runs on PRs!'
                publishChecks name: "Bug branches name",
                    title: 'Everything is ok on bug branch',
                    summary: '✅ All tests passed.',
                    text: 'Jest unit tests completed successfully.',
                    status: 'COMPLETED',
                    conclusion: 'SUCCESS',
                    detailsURL: "${env.BUILD_URL}"
            }
        }
        stage('PR checks') {
            when {
                branch 'PR-*'
            }
            steps {
                echo 'Run unit tests'

                script{
                    def npmStatus = sh(script: 'npm i', returnStatus: true)
                    if(npmStatus != 0){
                        publishChecks name: 'Jest Tests',
                          title: 'Could not install npm dependencies',
                          summary: 'npm install command failure',
                          text: 'npm install command failed. please check package.json file',
                          status: 'COMPLETED',
                          conclusion: 'FAILURE'
                    }

                    def testsStatus = sh(script: 'npm run test', returnStatus: true)

                    if(status != 0) {
                        publishChecks name: 'Jest Tests',
                          title: 'Some unit tests are failed',
                          summary: 'Test failures',
                          text: 'One or more Jest tests failed. Please check the Jenkins logs for details.',
                          status: 'COMPLETED',
                          conclusion: 'FAILURE'
                    } else {
                        publishChecks name: 'Unit Tests',
                            title: 'All unit tests are passed',
                            status: 'COMPLETED',
                            conclusion: 'SUCCESS'
                    }
                }

            }
        }
    }
}
