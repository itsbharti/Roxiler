
import './App.css';
import TransactionsTable from './components/TransactionsTable';

function App() {
  return (
    <div >
     <h1 className='text-center mb-8'>Transaction Dashboard</h1>
     <hr />
     <TransactionsTable />
    </div>
  );
}

export default App;
