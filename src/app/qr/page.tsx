import React from "react";
import QRCode from "react-qr-code";

export default function App() {
  return (
    <div className="p-10">
      <QRCode value="https://samhitha.vanguox.com" />
    </div>
  );
}
