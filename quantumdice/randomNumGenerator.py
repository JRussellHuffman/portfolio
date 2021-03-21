%matplotlib inline
# Importing standard Qiskit libraries and configuring account
from qiskit import QuantumCircuit, execute, Aer, IBMQ, ClassicalRegister, QuantumRegister
from qiskit.compiler import transpile, assemble
from qiskit.tools.jupyter import *
from qiskit.visualization import *
from qiskit.quantum_info import Pauli, state_fidelity, basis_state, process_fidelity
# Loading your IBM Q account(s)
provider = IBMQ.load_account()

qc = QuantumCircuit(5, 5)

# q = QuantumRegister(5)
# c = ClassicalRegister(5)

qc.h(0)
qc.h(1)
qc.h(2)
qc.h(3)
qc.h(4)
qc.measure([0, 1, 2, 3, 4], [0, 1, 2, 3, 4])


from qiskit.providers.ibmq import least_busy

large_enough_devices = provider.backends(filters=lambda x: x.configuration().n_qubits > 4 and not x.configuration().simulator)
backend = least_busy(large_enough_devices)
print("The best backend is " + backend.name())


outputArray = []

# backend = Aer.get_backend('qasm_simulator')

for x in range(0, 10):
    job_sim = execute(qc, backend, shots = 1)
    sim_result = job_sim.result()
#     print(sim_result.get_counts(qc)) # this returns the value that we're dropping into the array
    theKeys = sim_result.get_counts(qc).keys()
    listOfKeys = list(theKeys)
    converted = int(listOfKeys[0], 2) # convert binary to int
    outputArray.append(converted)
print(outputArray)
