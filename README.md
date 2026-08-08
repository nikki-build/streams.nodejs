# @nikki-build/streams

Turn your Android phone into a programmable IoT device.

**nikki Streams** is a Node.js SDK for communicating with the nikki Streams mobile application over WebSocket. It lets your applications receive real-time sensor data and control device features such as notifications, haptics, lighting, and audio.

---

## Features

* Simple API
* Automatic WebSocket URL generation
* Local device validation
* Session-based authentication
* Multiple device support
* Real-time event callbacks
* TypeScript support
* Promise-based connection API

---

## Privacy

Your privacy is a core design principle of nikki Streams.

* **All communication happens within your local network by default.**
* **Your sensor data and device information stay under your control.**
* **No cloud service is required to use the SDK.**
* **You decide which applications can connect to your device.**
* **Your phone remains your device, and your data remains yours.**

nikki Streams is designed to help you experiment, prototype, learn, and build exciting projects while keeping your personal data private.

Whether you're exploring sensors, building an IoT prototype, automating tasks, or simply experimenting, you remain in full control of your device and the information it shares.

---

## Learn More

Getting started is easy.

For step-by-step tutorials, example projects, and detailed documentation, visit the official resources:

* 📖 Documentation
* 🎥 Video Tutorials
* 💡 Example Projects
* 🚀 Quick Start Guides

These resources will help you learn how to connect devices, read sensor data, build real-time applications, and explore everything nikki Streams has to offer.

---

## Have Fun!

nikki Streams was created to make experimentation simple and enjoyable.

Turn your Android phone into a powerful IoT device, explore its sensors, build creative projects, automate everyday tasks, and discover what's possible—all while keeping your data private and under your control.

Happy building! 🚀


## Installation

```bash
npm install @nikki-build/streams
```

---

## Initialize

A session ID must be initialized once before creating devices.

```ts
import { SDK } from "@nikki-build/streams";

SDK.initialize("my-session-id");
```

---

## Create a Device

```ts
const device = SDK.createDevice(
    "192.168.1.77:3000",
    (event) => {

        console.log(event);

    }
);
```

The SDK automatically converts:

```text
192.168.1.77:3000
```

into

```text
ws://192.168.1.77:3000?sessionID=my-session-id
```

If `ws://` is already supplied, it is preserved.

---

## Connect

```ts
await device.connect();
```

Disconnect

```ts
device.disconnect();
```

---

## Device Controls

### Light

```ts
device.setLightStatus(true);

device.setLightStatus(false);
```

Payload

```json
{
  "light": true
}
```

---

### Volume

```ts
device.setVolume(80);
```

Range

```
0 - 100
```

Payload

```json
{
  "volume": 80
}
```

---

### Haptic Feedback

```ts
device.setHaptic();
```

Custom duration

```ts
device.setHaptic(500);
```

Payload

```json
{
  "haptic": true,
  "duration": 1000
}
```

---

### Notification

```ts
device.setNotification(
    "Hello",
    "Welcome to nikki Streams"
);
```

Payload

```json
{
  "notification": {
    "title": "Hello",
    "sub": "Welcome to nikki Streams"
  }
}
```

---

## Events

All events are delivered through the callback passed to `createDevice()`.

### Connected

```json
{
  "type": "statusChange",
  "data": "connected"
}
```

---

### Disconnected

```json
{
  "type": "statusChange",
  "data": "disconnected",
  "error": null
}
```

---

### Incoming Data

```json
{
  "type": "data",
  "data": {
    "sensor": "accelerometer",
    "x": 0.12,
    "y": 4.51,
    "z": 9.78
  }
}
```

---

## Example

```ts
import { SDK } from "@nikki-build/streams";

SDK.initialize("demo-session");

const device = SDK.createDevice(
    "192.168.1.77:3000",
    (event) => {

        switch (event.type) {

            case "statusChange":
                console.log("Status:", event.data);
                break;

            case "data":
                console.log(event.data);
                break;
        }

    }
);

await device.connect();

device.setLightStatus(true);

device.setVolume(50);

device.setHaptic();

device.setNotification(
    "Connected",
    "Hello from Node.js"
);

// ...

device.disconnect();
```

---

## Supported Device Features

* Notifications
* Haptic Feedback
* Light Control
* Volume Control

---

## Supported Sensors

The nikki Streams mobile application can provide real-time data from supported device sensors, including:

* Accelerometer
* Gyroscope
* Linear Acceleration
* Gravity
* Orientation
* Game Rotation Vector
* Pose
* Ambient Light
* Proximity
* Magnetometer
* Barometer
* Ambient Temperature
* GPS / GNSS
* Microphone
* NFC

---

## Requirements

* Node.js 18 or newer
* nikki Streams mobile application
* Device and computer connected to the same local network

---

## License

MIT
