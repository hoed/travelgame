// At the very top of the file, add this:
declare global {
  namespace JSX: {
    interface IntrinsicElements {
      'w3m-button': any;
    }
  }
}

// Then in the wallet section, use exactly:
{!useNonCryptoMode && (
  <div style={{ marginTop: 20, textAlign: 'center' }}>
    <w3m-button size="lg" />
  </div>
)}