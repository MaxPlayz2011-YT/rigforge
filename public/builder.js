// Builder Setup
let selectedParts = {};

// Hardware Database
let hardwareDB = {
  cpus: [],
  gpus: [],
  ram: [],
  storage: [],
  cases: [],
  cooling: []
};

// Fetch data from BuildCores OpenDB GitHub
async function fetchBuildCoresData() {
  const baseUrl = 'https://raw.githubusercontent.com/buildcores/buildcores-open-db/main';
  let loadedCount = 0;

  try {
    console.log('Attempting to fetch from BuildCores...');

    // Try different paths for CPU data
    const cpuPaths = [
      `${baseUrl}/cpu.json`,
      `${baseUrl}/data/cpu.json`,
      `${baseUrl}/processors/cpu.json`
    ];

    for (const path of cpuPaths) {
      try {
        const cpuRes = await fetch(path);
        if (cpuRes.ok) {
          const data = await cpuRes.json();
          const cpuArray = Array.isArray(data) ? data : Object.values(data);
          hardwareDB.cpus = cpuArray.slice(0, 150).map((cpu, i) => ({
            id: `cpu-${i}`,
            name: cpu.name || `CPU ${i}`,
            price: cpu.price || Math.floor(Math.random() * 500) + 150,
            specs: cpu.specs || 'N/A'
          }));
          loadedCount++;
          console.log(`✓ Loaded ${hardwareDB.cpus.length} CPUs`);
          break;
        }
      } catch (e) { }
    }

    // Try different paths for GPU data
    const gpuPaths = [
      `${baseUrl}/gpu.json`,
      `${baseUrl}/data/gpu.json`,
      `${baseUrl}/graphics/gpu.json`
    ];

    for (const path of gpuPaths) {
      try {
        const gpuRes = await fetch(path);
        if (gpuRes.ok) {
          const data = await gpuRes.json();
          const gpuArray = Array.isArray(data) ? data : Object.values(data);
          hardwareDB.gpus = gpuArray.slice(0, 150).map((gpu, i) => ({
            id: `gpu-${i}`,
            name: gpu.name || `GPU ${i}`,
            price: gpu.price || Math.floor(Math.random() * 1200) + 200,
            specs: gpu.specs || 'N/A'
          }));
          loadedCount++;
          console.log(`✓ Loaded ${hardwareDB.gpus.length} GPUs`);
          break;
        }
      } catch (e) { }
    }

  } catch (error) {
    console.warn('BuildCores fetch error:', error);
  }

  if (loadedCount < 2) {
    loadFallbackData();
  }
}

function loadFallbackData() {
  hardwareDB = {
    cpus: [
      // AMD Ryzen 9
      { id: 'r9-9950x', name: 'AMD Ryzen 9 9950X', price: 749, specs: '16c/32t / 5.7GHz' },
      { id: 'r9-7950x3d', name: 'AMD Ryzen 9 7950X3D', price: 699, specs: '16c/32t / 4.2GHz' },
      { id: 'r9-7950x', name: 'AMD Ryzen 9 7950X', price: 599, specs: '16c/32t / 4.5GHz' },
      { id: 'r9-5950x', name: 'AMD Ryzen 9 5950X', price: 549, specs: '16c/32t / 4.9GHz' },
      // AMD Ryzen 7
      { id: 'r7-9700x', name: 'AMD Ryzen 7 9700X', price: 399, specs: '8c/16t / 5.4GHz' },
      { id: 'r7-7700x', name: 'AMD Ryzen 7 7700X', price: 349, specs: '8c/16t / 4.5GHz' },
      { id: 'r7-5700x3d', name: 'AMD Ryzen 7 5700X3D', price: 299, specs: '8c/16t / 4.0GHz' },
      // AMD Ryzen 5
      { id: 'r5-9600x', name: 'AMD Ryzen 5 9600X', price: 229, specs: '6c/12t / 5.4GHz' },
      { id: 'r5-7600x', name: 'AMD Ryzen 5 7600X', price: 199, specs: '6c/12t / 4.7GHz' },
      { id: 'r5-5600x', name: 'AMD Ryzen 5 5600X', price: 149, specs: '6c/12t / 4.6GHz' },
      // Intel Core i9
      { id: 'i9-14900ks', name: 'Intel Core i9-14900KS', price: 689, specs: '24c/32t / 6.2GHz' },
      { id: 'i9-14900k', name: 'Intel Core i9-14900K', price: 589, specs: '24c/32t / 6.0GHz' },
      { id: 'i9-13900ks', name: 'Intel Core i9-13900KS', price: 679, specs: '24c/32t / 6.0GHz' },
      { id: 'i9-13900k', name: 'Intel Core i9-13900K', price: 499, specs: '24c/32t / 5.8GHz' },
      // Intel Core i7
      { id: 'i7-14700k', name: 'Intel Core i7-14700K', price: 419, specs: '20c/28t / 5.6GHz' },
      { id: 'i7-13700k', name: 'Intel Core i7-13700K', price: 359, specs: '16c/24t / 5.4GHz' },
      { id: 'i7-12700k', name: 'Intel Core i7-12700K', price: 289, specs: '12c/20t / 5.0GHz' },
      // Intel Core i5
      { id: 'i5-14600k', name: 'Intel Core i5-14600K', price: 289, specs: '14c/20t / 5.3GHz' },
      { id: 'i5-13600k', name: 'Intel Core i5-13600K', price: 239, specs: '14c/20t / 5.1GHz' },
    ],
    gpus: [
      // NVIDIA RTX 40 Series
      { id: 'rtx4090', name: 'NVIDIA RTX 4090', price: 1999, specs: '24GB / 16384 CUDA' },
      { id: 'rtx4080s', name: 'NVIDIA RTX 4080 SUPER', price: 1199, specs: '16GB / 10240 CUDA' },
      { id: 'rtx4080', name: 'NVIDIA RTX 4080', price: 1099, specs: '16GB / 9728 CUDA' },
      { id: 'rtx4070ti', name: 'NVIDIA RTX 4070 Ti SUPER', price: 899, specs: '12GB / 8064 CUDA' },
      { id: 'rtx4070ti-s', name: 'NVIDIA RTX 4070 Ti', price: 799, specs: '12GB / 7680 CUDA' },
      { id: 'rtx4070s', name: 'NVIDIA RTX 4070 SUPER', price: 649, specs: '12GB / 5888 CUDA' },
      { id: 'rtx4070', name: 'NVIDIA RTX 4070', price: 549, specs: '12GB / 5888 CUDA' },
      { id: 'rtx4060ti-16', name: 'NVIDIA RTX 4060 Ti 16GB', price: 499, specs: '16GB / 4352 CUDA' },
      { id: 'rtx4060ti', name: 'NVIDIA RTX 4060 Ti 8GB', price: 399, specs: '8GB / 4352 CUDA' },
      { id: 'rtx4060', name: 'NVIDIA RTX 4060', price: 249, specs: '8GB / 3072 CUDA' },
      // NVIDIA RTX 30 Series
      { id: 'rtx3090ti', name: 'NVIDIA RTX 3090 Ti', price: 799, specs: '24GB / 10496 CUDA' },
      { id: 'rtx3090', name: 'NVIDIA RTX 3090', price: 699, specs: '24GB / 10496 CUDA' },
      { id: 'rtx3080ti', name: 'NVIDIA RTX 3080 Ti', price: 599, specs: '12GB / 10240 CUDA' },
      { id: 'rtx3080', name: 'NVIDIA RTX 3080', price: 499, specs: '10GB / 8704 CUDA' },
      // AMD Radeon RX 7000
      { id: 'rx7900xtx', name: 'AMD Radeon RX 7900 XTX', price: 899, specs: '24GB GDDR6' },
      { id: 'rx7900xt', name: 'AMD Radeon RX 7900 XT', price: 699, specs: '20GB GDDR6' },
      { id: 'rx7800xt', name: 'AMD Radeon RX 7800 XT', price: 499, specs: '16GB GDDR6' },
      { id: 'rx7700xt', name: 'AMD Radeon RX 7700 XT', price: 399, specs: '12GB GDDR6' },
      // Intel Arc
      { id: 'arc-b580', name: 'Intel Arc B580', price: 249, specs: '12GB / 32 Xe Cores' },
      { id: 'arc-a770-16', name: 'Intel Arc A770 16GB', price: 329, specs: '16GB / 32 Xe' },
    ],
    ram: [
      // DDR5 High-End
      { id: 'ram128-ddr5', name: '128GB DDR5 6000MHz', price: 649, specs: 'CAS 30' },
      { id: 'ram96-ddr5', name: '96GB DDR5 6000MHz', price: 489, specs: 'CAS 30' },
      { id: 'ram64-ddr5-6000', name: '64GB DDR5 6000MHz', price: 319, specs: 'CAS 30' },
      { id: 'ram64-ddr5-5600', name: '64GB DDR5 5600MHz', price: 279, specs: 'CAS 28' },
      { id: 'ram48-ddr5-6000', name: '48GB DDR5 6000MHz', price: 249, specs: 'CAS 30' },
      { id: 'ram32-ddr5-7200', name: '32GB DDR5 7200MHz', price: 189, specs: 'CAS 34' },
      { id: 'ram32-ddr5-6600', name: '32GB DDR5 6600MHz', price: 169, specs: 'CAS 32' },
      { id: 'ram32-ddr5-6000', name: '32GB DDR5 6000MHz', price: 149, specs: 'CAS 30' },
      { id: 'ram32-ddr5-5600', name: '32GB DDR5 5600MHz', price: 129, specs: 'CAS 28' },
      { id: 'ram16-ddr5-6000', name: '16GB DDR5 6000MHz', price: 79, specs: 'CAS 30' },
      { id: 'ram16-ddr5-5600', name: '16GB DDR5 5600MHz', price: 69, specs: 'CAS 28' },
      // DDR4
      { id: 'ram32-ddr4-3600', name: '32GB DDR4 3600MHz', price: 109, specs: 'CAS 16' },
      { id: 'ram16-ddr4-3600', name: '16GB DDR4 3600MHz', price: 59, specs: 'CAS 16' },
    ],
    storage: [
      // NVMe PCIe Gen 5
      { id: 'ssd4tb-gen5', name: '4TB NVMe PCIe 5.0', price: 379, specs: '12400 MB/s' },
      { id: 'ssd2tb-gen5', name: '2TB NVMe PCIe 5.0', price: 199, specs: '12400 MB/s' },
      { id: 'ssd1tb-gen5', name: '1TB NVMe PCIe 5.0', price: 119, specs: '12400 MB/s' },
      // NVMe PCIe Gen 4
      { id: 'ssd4tb-gen4', name: '4TB NVMe PCIe 4.0', price: 299, specs: '7100 MB/s' },
      { id: 'ssd2tb-gen4', name: '2TB NVMe PCIe 4.0', price: 149, specs: '7100 MB/s' },
      { id: 'ssd1tb-gen4', name: '1TB NVMe PCIe 4.0', price: 89, specs: '7100 MB/s' },
      { id: 'ssd512gb-gen4', name: '512GB NVMe PCIe 4.0', price: 59, specs: '7100 MB/s' },
      // NVMe PCIe Gen 3
      { id: 'ssd2tb-gen3', name: '2TB NVMe PCIe 3.0', price: 99, specs: '3500 MB/s' },
      { id: 'ssd1tb-gen3', name: '1TB NVMe PCIe 3.0', price: 59, specs: '3500 MB/s' },
      // SATA SSD
      { id: 'ssd2tb-sata', name: '2TB SATA SSD', price: 129, specs: '560 MB/s' },
      { id: 'ssd1tb-sata', name: '1TB SATA SSD', price: 69, specs: '560 MB/s' },
    ],
    cases: [
      // Premium
      { id: 'case-corsair-5000t', name: 'Corsair iCUE 5000T', price: 349, specs: 'Tempered glass' },
      { id: 'case-corsair-elite', name: 'Corsair Crystal 570X', price: 229, specs: 'Tempered glass' },
      { id: 'case-lian-o11evo', name: 'Lian Li O11 Dynamic EVO', price: 189, specs: 'Dual chamber' },
      { id: 'case-fractal-north', name: 'Fractal Design North', price: 139, specs: 'Modular' },
      // Mid-Range
      { id: 'case-nzxt-h7', name: 'NZXT H7 Flow', price: 149, specs: 'Mesh front' },
      { id: 'case-nzxt-h510', name: 'NZXT H510 Elite', price: 179, specs: 'Mesh' },
      { id: 'case-be-quiet', name: 'be quiet! Pure Base 500DX', price: 109, specs: 'Noise dampening' },
      { id: 'case-phanteks', name: 'Phanteks Eclipse P400', price: 99, specs: 'Mesh front' },
      // Budget
      { id: 'case-deepcool', name: 'Deepcool Matrexx 55', price: 69, specs: 'Basic' },
      { id: 'case-thermaltake', name: 'Thermaltake Versa J25', price: 59, specs: 'Basic' },
    ],
    cooling: [
      // High-End AIO 420mm
      { id: 'cool-corsair-420', name: 'Corsair iCUE 420 RGB', price: 189, specs: '420mm / 360W' },
      { id: 'cool-nzxt-kraken-420', name: 'NZXT Kraken 420', price: 179, specs: '420mm / 380W' },
      { id: 'cool-ek-420', name: 'EK AIO 420', price: 219, specs: '420mm / 450W' },
      // Mid-Range AIO 360mm
      { id: 'cool-corsair-360', name: 'Corsair iCUE 360 RGB', price: 149, specs: '360mm / 320W' },
      { id: 'cool-nzxt-kraken-360', name: 'NZXT Kraken 360', price: 139, specs: '360mm / 300W' },
      { id: 'cool-evga-360', name: 'EVGA CLC 360', price: 129, specs: '360mm / 280W' },
      // Budget AIO 240mm
      { id: 'cool-corsair-240', name: 'Corsair iCUE 240 RGB', price: 99, specs: '240mm / 220W' },
      { id: 'cool-nzxt-kraken-240', name: 'NZXT Kraken 240', price: 89, specs: '240mm / 200W' },
      // High-End Air
      { id: 'cool-noctua-d15', name: 'Noctua NH-D15', price: 99, specs: 'Dual tower / 250W' },
      { id: 'cool-be-quiet-shadow', name: 'be quiet! Dark Rock Pro 4', price: 89, specs: 'Dual tower / 250W' },
      // Budget Air
      { id: 'cool-noctua-d12l', name: 'Noctua NH-D12L', price: 79, specs: 'Single tower / 220W' },
      { id: 'cool-cooler-master', name: 'Cooler Master Hyper 212', price: 49, specs: 'Single tower / 150W' },
    ]
  };
}

function populateSelects() {
  document.getElementById('cpu-select').innerHTML = '<option value="">Select a processor...</option>';
  hardwareDB.cpus.forEach(cpu => {
    const option = document.createElement('option');
    option.value = cpu.id;
    option.textContent = `${cpu.name} - $${cpu.price}`;
    document.getElementById('cpu-select').appendChild(option);
  });

  document.getElementById('gpu-select').innerHTML = '<option value="">Select a graphics card...</option>';
  hardwareDB.gpus.forEach(gpu => {
    const option = document.createElement('option');
    option.value = gpu.id;
    option.textContent = `${gpu.name} - $${gpu.price}`;
    document.getElementById('gpu-select').appendChild(option);
  });

  document.getElementById('ram-select').innerHTML = '<option value="">Select memory...</option>';
  hardwareDB.ram.forEach(ram => {
    const option = document.createElement('option');
    option.value = ram.id;
    option.textContent = `${ram.name} - $${ram.price}`;
    document.getElementById('ram-select').appendChild(option);
  });

  document.getElementById('storage-select').innerHTML = '<option value="">Select storage...</option>';
  hardwareDB.storage.forEach(storage => {
    const option = document.createElement('option');
    option.value = storage.id;
    option.textContent = `${storage.name} - $${storage.price}`;
    document.getElementById('storage-select').appendChild(option);
  });

  document.getElementById('case-select').innerHTML = '<option value="">Select a case...</option>';
  hardwareDB.cases.forEach(caseItem => {
    const option = document.createElement('option');
    option.value = caseItem.id;
    option.textContent = `${caseItem.name} - $${caseItem.price}`;
    document.getElementById('case-select').appendChild(option);
  });

  document.getElementById('cooling-select').innerHTML = '<option value="">Select cooling...</option>';
  hardwareDB.cooling.forEach(cooling => {
    const option = document.createElement('option');
    option.value = cooling.id;
    option.textContent = `${cooling.name} - $${cooling.price}`;
    document.getElementById('cooling-select').appendChild(option);
  });
}

function setupEventListeners() {
  document.getElementById('cpu-select').addEventListener('change', (e) => {
    const part = hardwareDB.cpus.find(p => p.id === e.target.value);
    if (part) {
      selectedParts.cpu = part;
      document.getElementById('cpu-specs').textContent = part.specs;
    }
    updateSummary();
  });

  document.getElementById('gpu-select').addEventListener('change', (e) => {
    const part = hardwareDB.gpus.find(p => p.id === e.target.value);
    if (part) {
      selectedParts.gpu = part;
      document.getElementById('gpu-specs').textContent = part.specs;
    }
    updateSummary();
  });

  document.getElementById('ram-select').addEventListener('change', (e) => {
    const part = hardwareDB.ram.find(p => p.id === e.target.value);
    if (part) {
      selectedParts.ram = part;
      document.getElementById('ram-specs').textContent = part.specs;
    }
    updateSummary();
  });

  document.getElementById('storage-select').addEventListener('change', (e) => {
    const part = hardwareDB.storage.find(p => p.id === e.target.value);
    if (part) {
      selectedParts.storage = part;
      document.getElementById('storage-specs').textContent = part.specs;
    }
    updateSummary();
  });

  document.getElementById('case-select').addEventListener('change', (e) => {
    const part = hardwareDB.cases.find(p => p.id === e.target.value);
    if (part) {
      selectedParts.case = part;
      document.getElementById('case-specs').textContent = part.specs;
    }
    updateSummary();
  });

  document.getElementById('cooling-select').addEventListener('change', (e) => {
    const part = hardwareDB.cooling.find(p => p.id === e.target.value);
    if (part) {
      selectedParts.cooling = part;
      document.getElementById('cooling-specs').textContent = part.specs;
    }
    updateSummary();
  });
}

function updateSummary() {
  const summaryList = document.getElementById('summary-list');
  summaryList.innerHTML = '';
  let total = 0;

  Object.keys(selectedParts).forEach(key => {
    const part = selectedParts[key];
    const line = document.createElement('div');
    line.style.marginBottom = '8px';
    line.innerHTML = `<div style="font-size: 12px; color: #00d4ff;">${key.toUpperCase()}</div><div style="font-size: 13px; font-weight: bold;">${part.name}</div><div style="font-size: 11px; color: #ffaa00;">$${part.price}</div>`;
    summaryList.appendChild(line);
    total += part.price;
  });

  document.getElementById('total-price').textContent = `$${total.toLocaleString()}`;
}

// Claude Vision API Integration (via Vercel Function)
async function analyzeScreenWithClaude() {
  try {
    document.getElementById('analyze-screen-btn').disabled = true;
    document.getElementById('analyze-screen-btn').textContent = '⏳ Analyzing...';

    // Capture screenshot of BuildCores iframe
    const canvas = await html2canvas(document.getElementById('buildcores-iframe'));
    const imageData = canvas.toDataURL('image/jpeg').split(',')[1];

    // Call Vercel function (no API key needed on frontend)
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageData })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const components = await response.json();

    // Auto-fill the form
    autoFillComponents(components);
    console.log('✓ Components auto-filled from screenshot');

    document.getElementById('analyze-screen-btn').disabled = false;
    document.getElementById('analyze-screen-btn').textContent = '📸 Analyze Screenshot';
  } catch (error) {
    console.error('Vision analysis error:', error);
    alert('Error analyzing screenshot. Make sure your Replit server is running.');
    document.getElementById('analyze-screen-btn').disabled = false;
    document.getElementById('analyze-screen-btn').textContent = '📸 Analyze Screenshot';
  }
}

function autoFillComponents(components) {
  if (components.cpu) {
    const cpuOption = Array.from(document.getElementById('cpu-select').options).find(opt =>
      opt.textContent.toLowerCase().includes(components.cpu.toLowerCase())
    );
    if (cpuOption) {
      document.getElementById('cpu-select').value = cpuOption.value;
      document.getElementById('cpu-select').dispatchEvent(new Event('change'));
    }
  }
  if (components.gpu) {
    const gpuOption = Array.from(document.getElementById('gpu-select').options).find(opt =>
      opt.textContent.toLowerCase().includes(components.gpu.toLowerCase())
    );
    if (gpuOption) {
      document.getElementById('gpu-select').value = gpuOption.value;
      document.getElementById('gpu-select').dispatchEvent(new Event('change'));
    }
  }
  if (components.ram) {
    const ramOption = Array.from(document.getElementById('ram-select').options).find(opt =>
      opt.textContent.toLowerCase().includes(components.ram.toLowerCase())
    );
    if (ramOption) {
      document.getElementById('ram-select').value = ramOption.value;
      document.getElementById('ram-select').dispatchEvent(new Event('change'));
    }
  }
  if (components.storage) {
    const storageOption = Array.from(document.getElementById('storage-select').options).find(opt =>
      opt.textContent.toLowerCase().includes(components.storage.toLowerCase())
    );
    if (storageOption) {
      document.getElementById('storage-select').value = storageOption.value;
      document.getElementById('storage-select').dispatchEvent(new Event('change'));
    }
  }
  if (components.case) {
    const caseOption = Array.from(document.getElementById('case-select').options).find(opt =>
      opt.textContent.toLowerCase().includes(components.case.toLowerCase())
    );
    if (caseOption) {
      document.getElementById('case-select').value = caseOption.value;
      document.getElementById('case-select').dispatchEvent(new Event('change'));
    }
  }
  if (components.cooling) {
    const coolingOption = Array.from(document.getElementById('cooling-select').options).find(opt =>
      opt.textContent.toLowerCase().includes(components.cooling.toLowerCase())
    );
    if (coolingOption) {
      document.getElementById('cooling-select').value = coolingOption.value;
      document.getElementById('cooling-select').dispatchEvent(new Event('change'));
    }
  }
}

// Listen for messages from BuildCores iframe
window.addEventListener('message', (event) => {
  console.log('Message from iframe:', event.data);

  if (event.data && typeof event.data === 'object') {
    autoFillComponents(event.data);
    console.log('✓ Auto-filled from BuildCores');
  }
});

// Initialize
function initialize() {
  console.log('🚀 Initializing PC Builder...');
  try {
    loadFallbackData();
    populateSelects();
    setupEventListeners();

    // Add Claude Vision button listener
    const analyzeBtn = document.getElementById('analyze-screen-btn');
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', analyzeScreenWithClaude);
    }

    console.log('✓ Builder ready');
  } catch (error) {
    console.error('Error:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
