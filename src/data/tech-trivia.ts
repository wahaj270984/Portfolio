/** AI/ML/CS technical trivia - rotating fun facts generator. */
export interface TechFact {
  id: string
  category: 'ml' | 'cs' | 'math' | 'history' | 'hardware'
  fact: string
  source?: string
}

export const techTrivia: TechFact[] = [
  {
    id: 'backprop-1986',
    category: 'ml',
    fact: 'Backpropagation was popularized in 1986 by Rumelhart, Hinton & Williams - but the core idea was already proposed by Werbos in 1974.',
    source: 'Nature 323, 533–536 (1986)',
  },
  {
    id: 'attention-2017',
    category: 'ml',
    fact: '"Attention Is All You Need" (2017) introduced the Transformer architecture - now the backbone of GPT, BERT, and modern LLMs.',
    source: 'Vaswani et al., NeurIPS 2017',
  },
  {
    id: 'imagenet-moment',
    category: 'ml',
    fact: 'AlexNet (2012) reduced ImageNet top-5 error from 26% to 15.3%, sparking the deep learning revolution.',
  },
  {
    id: 'relu-simple',
    category: 'ml',
    fact: 'ReLU (f(x) = max(0, x)) is the simplest non-linearity, yet it outperforms sigmoid/tanh in deep nets by avoiding vanishing gradients.',
  },
  {
    id: 'dropout-regularization',
    category: 'ml',
    fact: 'Dropout was proposed in 2012 as a way to prevent overfitting - randomly "dropping" neurons during training forces the network to learn robust features.',
    source: 'Srivastava et al., JMLR 2014',
  },
  {
    id: 'gan-game',
    category: 'ml',
    fact: 'GANs (Goodfellow et al., 2014) train two networks in a minimax game: a generator creates fake data, and a discriminator learns to spot it.',
  },
  {
    id: 'resnet-depth',
    category: 'ml',
    fact: 'ResNet (2015) introduced skip connections, enabling 152-layer networks that train faster than 34-layer nets without them.',
  },
  {
    id: 'yolo-realtime',
    category: 'ml',
    fact: 'YOLO (You Only Look Once, 2016) runs object detection in a single forward pass - enabling real-time inference at 45+ FPS.',
  },
  {
    id: 'batch-norm',
    category: 'ml',
    fact: 'Batch Normalization (2015) stabilizes training by normalizing layer inputs - allowing higher learning rates and faster convergence.',
  },
  {
    id: 'autograd',
    category: 'ml',
    fact: 'PyTorch autograd builds a dynamic computation graph at runtime, while TensorFlow 1.x used static graphs - PyTorch 2.x now compiles both.',
  },
  {
    id: 'halting-problem',
    category: 'cs',
    fact: 'Turing proved in 1936 that no algorithm can determine whether an arbitrary program will halt - the famous Halting Problem.',
  },
  {
    id: 'nphard-tsp',
    category: 'cs',
    fact: 'The Traveling Salesman Problem is NP-hard - no known polynomial-time solution exists, yet heuristics like Christofides give 1.5× optimal.',
  },
  {
    id: 'quicksort-avg',
    category: 'cs',
    fact: 'Quicksort averages O(n log n) but degrades to O(n²) on sorted input - randomized pivot selection fixes this.',
  },
  {
    id: 'cache-miss-cost',
    category: 'cs',
    fact: 'An L1 cache hit takes ~1 cycle, L3 ~40 cycles, and a RAM miss ~200+ cycles - cache-aware code can be 100× faster.',
  },
  {
    id: 'bloom-filter',
    category: 'cs',
    fact: 'Bloom filters use ~10 bits per element (vs 64+ for a hash set) - they can report false positives but never false negatives.',
  },
  {
    id: 'dijkstra-goto',
    category: 'history',
    fact: 'Dijkstra\'s 1968 letter "Go To Statement Considered Harmful" sparked structured programming - though goto still lives in Linux kernel code.',
  },
  {
    id: 'first-bug',
    category: 'history',
    fact: 'The term "bug" dates to 1947 when Grace Hopper found a moth in a Harvard Mark II relay - she taped it into the logbook.',
  },
  {
    id: 'unix-epoch',
    category: 'history',
    fact: 'Unix time starts at 00:00:00 UTC on January 1, 1970 - called the Unix epoch. The 32-bit overflow happens in 2038.',
  },
  {
    id: 'first-neural-net',
    category: 'history',
    fact: 'The Perceptron (Rosenblatt, 1958) was the first neural network implemented in hardware - a 20×20 photocell array connected to motors.',
  },
  {
    id: 'moores-law',
    category: 'hardware',
    fact: 'Moore\'s Law (1965): transistor count doubles every ~18 months - it held for 50 years but is slowing as we approach atomic limits.',
  },
  {
    id: 'simd-speedup',
    category: 'hardware',
    fact: 'SIMD (Single Instruction, Multiple Data) lets one CPU instruction operate on 4-16 values at once - critical for vectorized ML ops.',
  },
  {
    id: 'gpu-teraflops',
    category: 'hardware',
    fact: 'A modern GPU delivers 10-40 TFLOPS (trillion floating-point ops/sec) vs a CPU\'s ~1 TFLOPS - 10×+ faster for parallel workloads.',
  },
  {
    id: 'fp16-training',
    category: 'hardware',
    fact: 'Mixed-precision training (FP16 + FP32) cuts memory usage and speeds up training by 2-3× on modern GPUs with Tensor Cores.',
  },
  {
    id: 'roofline-model',
    category: 'hardware',
    fact: 'The Roofline Model plots compute throughput vs memory bandwidth - it shows whether your kernel is compute-bound or memory-bound.',
  },
  {
    id: 'gradient-vanishing',
    category: 'math',
    fact: 'Sigmoid squashes inputs to (0,1), so gradients shrink exponentially in deep nets - ReLU and skip connections mitigate this.',
  },
  {
    id: 'convex-optimization',
    category: 'math',
    fact: 'Convex optimization guarantees a global minimum - but neural nets are non-convex, so SGD finds local minima that generalize well.',
  },
  {
    id: 'svd-compression',
    category: 'math',
    fact: 'Singular Value Decomposition (SVD) decomposes a matrix into three parts - used for PCA, image compression, and recommender systems.',
  },
  {
    id: 'softmax-temperature',
    category: 'math',
    fact: 'Softmax with temperature T: high T → uniform distribution, low T → sharper peaks. Used in model distillation and sampling.',
  },
  {
    id: 'kl-divergence',
    category: 'math',
    fact: 'KL divergence measures how one probability distribution differs from another - it is asymmetric and always ≥ 0.',
  },
]
