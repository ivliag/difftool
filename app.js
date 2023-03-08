const dfm = new diff_match_patch();

const cleanUp = (diff) => {
  dfm.diff_cleanupEfficiency(diff);
  return diff;
}

const b = (o) => JSON.stringify(o, null, 2);

const t1 = `I saw Peter's hkV post and became very interested to learn more about you.`;
const t2 = `Peter's post caught my attention and I wanted to learn more about you.`;

const S = {
  container: {
    display: 'flex',
    gap: '16px'
  },
  textarea: {
    width: '100%',
    height: '100px',
  },
  data: {
    background: '#eee',
    padding: '16px',
  }
}

const App = () => {
  const [text1, setText1] = React.useState(t1);
  const [text2, setText2] = React.useState(t2);

  const diff = dfm.diff_wordMode_(text1, text2);
  
  return (
    <React.Fragment>
      <h1>{'Diff tool'}</h1>
      <div style={S.container}>
        <textarea style={S.textarea} onChange={(evt) => setText1(evt.target.value)}>{text1}</textarea>
        <textarea style={S.textarea} onChange={(evt) => setText2(evt.target.value)}>{text2}</textarea>
      </div>
      <h4>Result</h4>
      <div dangerouslySetInnerHTML={{ __html: dfm.diff_prettyHtml(diff) }}></div>
      <h4>Data</h4>
      <pre style={S.data}>
        {b(diff)}
      </pre>
    </React.Fragment>
  );
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);
