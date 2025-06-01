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
                error('Stopping pipeline due to npm install failure')
              }

              def testOutput = sh(
                  script: 'npm run test:coverage',
                  returnStdout: true
              ).trim()

              def testFailed = testOutput.contains('FAIL') || testOutput.contains('Test Suites: ') && testOutput.contains('failed')

              if (testFailed) {
                recordCoverage
                  enabledForFailure: true,
                  tools: [
                    [parser: 'JUNIT', pattern: 'junit.xml']
                  ]
                }
            }
          }
          post {
            always {
              recordCoverage(
                tools: [
                  [parser: 'COBERTURA', pattern: '**/cobertura-coverage.xml'],
                  [parser: 'JUNIT', pattern: 'junit.xml']
                ]
              )
            }
          }
        }
    }
}
