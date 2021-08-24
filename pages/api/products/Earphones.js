export default function handler (req, res) {
    res.status(200).json(
        {
            "Connectivity": ["2.5mm Jack", "3.5mm Jack", "Bluetooth", "Lightning", "Micro-USB", "Not Applicable", "Proprietary", "USB", "USB-C", "Not Specified"],
            "Features": ["Active Noise Cancellation", "Adjustable Headband", "Ambient Sound Mode", "Bluetooth Multi-point", "Bone Conduction", "Built-in Microphone", "Built-In On/Off Switch", "Call functions", "Channel Monitor", "Closed Back", "Detachable Cable", "Echo Cancellation", "Extra Bass", "FM Radio", "Foam Tips", "Foldable", "HD Voice", "In-Line Control", "Leather Cushions", "L-Shape Plug", "LTE", "Microphone Mute Button", "Motion-detecting accelerometer", "NFC Bluetooth Pairing", "Noise Cancellation", "Noise Isolation", "On-Cable", "Open Back", "Playback Controls", "Push-to-talk", "Rechargeable Battery", "Replaceable Earpads", "Replaceable Ear Tips", "Retractable Cable", "Rotating Ear Cups", "Speech-detecting accelerometer", "Stereo", "Surround Sound", "Sweat Proof", "Throat", "Touch Control", "Volume Control", "Volume Limitation", "Waterproof", "Water-Resistant", "Wireless Charging", "Zipper Cable", "Not Specified"],
            "Color": ["Beige", "Black", "Blue", "Brown", "Clear", "Gold", "Gray", "Green", "Multicolor", "Orange", "Pink", "Purple", "Red", "Silver", "White", "Yellow", "Not Specified"]
        }
    )
}