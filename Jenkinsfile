pipeline {
    agent { label 'nodejs-agent' }

    stages {
        stage('PR checks') {
            when {
                branch 'PR-*'
            }
            steps {
                echo 'Running PR checks...'

                script {
                    def checkName = 'Unit Tests'

                    def npmStatus = sh(script: 'npm install', returnStatus: true)
                    if (npmStatus != 0) {
                        publishChecks name: checkName,
                          title: 'Dependency Installation Failed',
                          summary: '`npm install` failed',
                          text: 'Check your `package.json` and ensure all dependencies are valid.',
                          status: 'COMPLETED',
                          conclusion: 'FAILURE'
                        error("Stopping pipeline due to npm install failure")
                    }

                    def testOutput = ''
                    def testStatus = 0
                    try {
                        testOutput = sh(script: 'npm run test -- --ci --reporters=default --reporters=jest-junit', returnStdout: true)
                    } catch (e) {
                        testOutput = e.getMessage()
                        testStatus = 1
                    }

                    if (testStatus != 0) {
                        publishChecks name: checkName,
                          title: 'Unit Tests Failed',
                          summary: 'Jest tests failed',
                          text: """```
                          ${testOutput.take(6500)}
                          ```""",
                          status: 'COMPLETED',
                          conclusion: 'FAILURE'
                    } else {
                        publishChecks name: checkName,
                          title: 'Unit Tests Passed',
                          summary: 'All Jest tests passed',
                          text: 'All unit tests passed successfully.',
                          status: 'COMPLETED',
                          conclusion: 'SUCCESS'
                    }
                }
            }
        }
    }
}
