# ioBroker Adapter Development with GitHub Copilot

**Version:** 0.4.0
**Template Source:** https://github.com/DrozmotiX/ioBroker-Copilot-Instructions

This file contains instructions and best practices for GitHub Copilot when working on ioBroker adapter development.

## Project Context

You are working on an ioBroker adapter. ioBroker is an integration platform for the Internet of Things, focused on building smart home and industrial IoT solutions. Adapters are plugins that connect ioBroker to external systems, devices, or services.

## Adapter-Specific Context

- **Adapter Name**: vis-material  
- **Primary Function**: Material design widgets for ioBroker.vis visualization
- **Adapter Type**: Visualization widgets (`type: "visualization-widgets"`)
- **Mode**: No main process (`mode: "none"`, `onlyWWW: true`)
- **Main Entry**: `widgets/material.html`
- **Key Dependencies**: No runtime dependencies, pure frontend widget collection
- **Target Integration**: ioBroker.vis visualization framework
- **Widget Categories**: Material design components (temperature, light, dimmer, humidity, window shutters)

This adapter provides material design widgets for the ioBroker.vis visualization platform. It does not run as a backend service but rather provides frontend HTML/CSS/JavaScript widgets that are loaded by the vis adapter. The main focus is on creating responsive, modern-looking material design components for smart home dashboards.

## Testing

### Unit Testing
- Use Jest as the primary testing framework for ioBroker adapters
- Create tests for all adapter main functions and helper methods
- Test error handling scenarios and edge cases
- Mock external API calls and hardware dependencies
- For adapters connecting to APIs/devices not reachable by internet, provide example data files to allow testing of functionality without live connections
- Example test structure:
  ```javascript
  describe('AdapterName', () => {
    let adapter;
    
    beforeEach(() => {
      // Setup test adapter instance
    });
    
    test('should initialize correctly', () => {
      // Test adapter initialization
    });
  });
  ```

### Integration Testing

**IMPORTANT**: Use the official `@iobroker/testing` framework for all integration tests. This is the ONLY correct way to test ioBroker adapters.

**Official Documentation**: https://github.com/ioBroker/testing

#### Framework Structure
Integration tests MUST follow this exact pattern:

```javascript
const path = require('path');
const { tests } = require('@iobroker/testing');

// Define test coordinates or configuration
const TEST_COORDINATES = '52.520008,13.404954'; // Berlin
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// Use tests.integration() with defineAdditionalTests
tests.integration(path.join(__dirname, '..'), {
    defineAdditionalTests({ suite }) {
        suite('Test adapter with specific configuration', (getHarness) => {
            let harness;

            before(() => {
                harness = getHarness();
            });

            it('should configure and start adapter', function () {
                return new Promise(async (resolve, reject) => {
                    try {
                        harness = getHarness();
                        
                        // Get adapter object using promisified pattern
                        const obj = await new Promise((res, rej) => {
                            harness.objects.getObject('system.adapter.your-adapter.0', (err, o) => {
                                if (err) return rej(err);
                                res(o);
                            });
                        });
                        
                        if (!obj) {
                            return reject(new Error('Adapter object not found'));
                        }

                        // Configure adapter properties
                        Object.assign(obj.native, {
                            position: TEST_COORDINATES,
                            createCurrently: true,
                            createHourly: true,
                            createDaily: true,
                            // Add other configuration as needed
                        });

                        // Set the updated configuration
                        harness.objects.setObject(obj._id, obj);

                        console.log('✅ Step 1: Configuration written, starting adapter...');
                        
                        // Start adapter and wait
                        await harness.startAdapterAndWait();
                        
                        console.log('✅ Step 2: Adapter started');

                        // Wait for adapter to process data
                        const waitMs = 15000;
                        await wait(waitMs);

                        console.log('🔍 Step 3: Checking states after adapter run...');
                        
                        // Check that states were created
                        const states = await harness.getAllStatesAsync();
                        console.log(`Found ${Object.keys(states).length} states`);
                        
                        resolve();
                    } catch (error) {
                        console.error('❌ Test failed:', error);
                        reject(error);
                    }
                });
            }).timeout(60000);
        });
    }
});
```

### Widget-Specific Testing

For visualization widgets like vis-material, focus testing on:

```javascript
// Test widget loading and initialization
describe('Material Widgets', () => {
    test('should load all widget definitions', () => {
        // Verify widget HTML files load correctly
        // Check widget metadata and options
        // Validate CSS and JavaScript assets
    });
    
    test('should handle widget state updates', () => {
        // Test widget reactions to ioBroker state changes
        // Verify data binding functionality
        // Check error handling for invalid states
    });
    
    test('should render responsive layouts', () => {
        // Test widget display on different screen sizes
        // Verify material design compliance
        // Check accessibility features
    });
});
```

## ioBroker Development Patterns

### Object and State Management

Use the ioBroker state and object APIs consistently:

```javascript
// Creating states
await this.setObjectNotExistsAsync('device.channel.state', {
    type: 'state',
    common: {
        name: 'State Name',
        type: 'boolean',
        role: 'switch',
        read: true,
        write: true
    },
    native: {}
});

// Setting values with acknowledgment
await this.setStateAsync('device.channel.state', { val: true, ack: true });

// Subscribing to state changes
this.subscribeStates('*');
```

### Error Handling and Logging

Follow ioBroker logging standards:

```javascript
// Appropriate logging levels
this.log.error('Critical error message');
this.log.warn('Warning message');
this.log.info('Information message');
this.log.debug('Debug message');

// Error handling with proper cleanup
try {
    // risky operation
} catch (error) {
    this.log.error(`Operation failed: ${error.message}`);
    // Cleanup resources if needed
    await this.cleanup();
}
```

### Configuration Management (JSON-Config)

For adapters using JSON-Config (admin/jsonConfig.json):

```javascript
// Access configuration values
const config = this.config;
const apiKey = config.apiKey;
const updateInterval = config.updateInterval || 300000; // Default 5 minutes

// Validate required configuration
if (!config.apiKey) {
    this.log.error('API key is required in adapter configuration');
    return;
}
```

### Lifecycle Management

Implement proper adapter lifecycle methods:

```javascript
class MyAdapter extends utils.Adapter {
    constructor(options = {}) {
        super({ ...options, name: 'my-adapter' });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    async onReady() {
        // Adapter startup logic
        this.setState('info.connection', false, true);
        await this.main();
    }

    onStateChange(id, state) {
        if (!state || state.ack) return;
        // Handle state changes from user/other adapters
    }

    onUnload(callback) {
        try {
            // Cleanup: stop timers, close connections
            if (this.refreshTimer) {
                clearInterval(this.refreshTimer);
                this.refreshTimer = undefined;
            }
            // Close connections, clean up resources
            callback();
        } catch (e) {
            callback();
        }
    }
}
```

### Widget Development Patterns

For vis-material widgets specifically:

```javascript
// Widget definition structure
$.extend(true, systemDictionary, {
    "material light": {
        "en": "Material Light",
        "de": "Material Licht",
        "ru": "Материальный свет"
    }
});

// Widget initialization
vis.binds['vis-material'] = {
    version: "0.2.0",
    showVersion: function () {
        if (vis.binds['vis-material'].version) {
            console.log('Version vis-material: ' + vis.binds['vis-material'].version);
        }
    },
    
    createWidget: function (widgetID, view, data, style) {
        // Widget creation logic
        // Handle data binding
        // Setup event handlers
        // Apply material design styling
    }
};
```

## Code Style and Standards

- Follow JavaScript/TypeScript best practices
- Use async/await for asynchronous operations
- Implement proper resource cleanup in `unload()` method
- Use semantic versioning for adapter releases
- Include proper JSDoc comments for public methods

## CI/CD and Testing Integration

### GitHub Actions for API Testing
For adapters with external API dependencies, implement separate CI/CD jobs:

```yaml
# Tests API connectivity with demo credentials (runs separately)
demo-api-tests:
  if: contains(github.event.head_commit.message, '[skip ci]') == false
  
  runs-on: ubuntu-22.04
  
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Use Node.js 20.x
      uses: actions/setup-node@v4
      with:
        node-version: 20.x
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run demo API tests
      run: npm run test:integration-demo
```

### CI/CD Best Practices
- Run credential tests separately from main test suite
- Use ubuntu-22.04 for consistency
- Don't make credential tests required for deployment
- Provide clear failure messages for API connectivity issues
- Use appropriate timeouts for external API calls (120+ seconds)

### Package.json Script Integration
Add dedicated script for credential testing:
```json
{
  "scripts": {
    "test:integration-demo": "mocha test/integration-demo --exit"
  }
}
```

### Widget-Specific CI/CD

For vis-material widgets, focus on:

```yaml
widget-validation:
  runs-on: ubuntu-22.04
  steps:
    - name: Validate widget definitions
      run: |
        # Check HTML syntax
        # Validate CSS compliance
        # Test JavaScript widget loading
        # Check material design guidelines
        npm run validate:widgets
```