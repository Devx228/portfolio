import {
  Activity,
  BrainCircuit,
  CircuitBoard,
  Code2,
  Database,
  FlaskConical,
  GraduationCap,
  Layers3,
  Mic2,
  Network,
  Radar,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";

export type Evidence = "repo-backed" | "resume-sourced" | "report-sourced" | "user-sourced" | "todo";
export type Priority = "P0" | "P1" | "P2" | "P3";

export type ProjectCardCopy = {
  title?: string;
  category?: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  priority: Priority;
  evidence: Evidence;
  status: string;
  date: string;
  summary: string;
  problem: string;
  approach: string;
  stack: string[];
  highlights: string[];
  metrics: string[];
  role: string;
  repo?: string;
  demo?: string;
  caseStudy: boolean;
  featured: boolean;
  accent: "cyan" | "blue" | "green" | "amber" | "red";
  caseStudyDetails?: {
    variant?: "oracleInfra";
    sectionLabels?: {
      headline?: string;
      method?: string;
      researchIterations?: string;
      limitations?: string;
    };
    featureSections?: {
      eyebrow: string;
      title: string;
      body: string;
      highlights: string[];
      metrics?: {
        label: string;
        value: string;
        detail: string;
      }[];
    }[];
    headlineMetrics: {
      label: string;
      value: string;
      detail: string;
    }[];
    researchIterations: {
      title: string;
      body: string;
    }[];
    method: {
      title: string;
      body: string;
    }[];
    resultTables: {
      title: string;
      note: string;
      headers: string[];
      rows: string[][];
    }[];
    limitations: string[];
    futureWork: string[];
  };
};

export const profile = {
  name: "Devansh Abhay Dhok",
  title: "Computer Science Undergraduate, IIT Kanpur",
  location: "India",
  email: "devanshad23@iitk.ac.in",
  github: "https://github.com/Devx228/",
  linkedin: "https://www.linkedin.com/in/devansh-a-dhok-516264303/",
  headline:
    "CSE undergrad at IIT Kanpur, building software with purpose and impact.",
  seoDescription:
    "Computer Science undergraduate at IIT Kanpur working across AI, medical technology, agent infrastructure, machine learning, full-stack platforms, and low-level systems.",
};

export const heroBootLines = [
  "booting devansh.shell",
  "loading selected work",
  "mounting projects",
  "syncing research",
];

export const projects: Project[] = [
  {
    slug: "progressive-cosine-distillation-asr",
    title: "Progressive Cosine Distillation for Low-Resource ASR",
    shortTitle: "Speech Recognition Research",
    category: "Low-Resource ASR",
    priority: "P0",
    evidence: "report-sourced",
    status: "UG Research Project",
    date: "April 2026",
    summary:
      "UG research project on cross-lingual encoder transfer for Whisper large-v3, improving Assamese WER from 47.64% to 39.63% with cosine hidden-state alignment and progressive distillation warmup.",
    problem:
      "Whisper large-v3 failed badly in zero-shot mode on Assamese and Sanskrit, with WER above 100%. The question was whether a related high-resource language could improve low-resource ASR beyond target-only fine-tuning.",
    approach:
      "Use Bengali to Assamese as the main transfer case, use Hindi to Sanskrit as a contrast case, and let failed methods drive the final Progressive Cosine design.",
    stack: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "Whisper large-v3",
      "Seq2SeqTrainer",
      "jiwer",
      "AI4Bharat IndicVoices",
      "FP16",
      "2 x NVIDIA A6000",
    ],
    highlights: [
      "Diagnosed the encoder as the transfer bottleneck in Whisper large-v3.",
      "Tested multistage fine-tuning, LoRA warm-start, MSE distillation, and Progressive Cosine variants.",
      "Replaced MSE with cosine alignment to handle teacher-student representation-space mismatch.",
      "Used progressive lambda warmup to avoid early competition between ASR and distillation losses.",
    ],
    metrics: [
      "Assamese-only baseline: 47.64% WER.",
      "Progressive Cosine warm-start: 39.63% WER.",
      "8.01 percentage-point absolute WER improvement.",
      "16.81% relative WER improvement.",
    ],
    role: "Author / UG Research Project.",
    repo: undefined,
    caseStudy: true,
    featured: true,
    accent: "cyan",
    caseStudyDetails: {
      headlineMetrics: [
        {
          label: "Assamese WER",
          value: "47.64% -> 39.63%",
          detail: "Assamese-only baseline to Progressive Cosine warm-start.",
        },
        {
          label: "Absolute gain",
          value: "8.01 pp",
          detail: "WER improvement on the reported Assamese experiment.",
        },
        {
          label: "Relative gain",
          value: "16.81%",
          detail: "Relative WER improvement over the Assamese-only baseline.",
        },
      ],
      researchIterations: [
        {
          title: "Frozen encoder diagnostic",
          body: "Training only the decoder left Assamese WER above 80%, so transfer had to happen through the encoder.",
        },
        {
          title: "Multistage fine-tuning",
          body: "Bengali to Assamese sequential training reached 41.12% WER, proving related-language initialization helped but could drift during target fine-tuning.",
        },
        {
          title: "LoRA warm-start",
          body: "LoRA scratch reached 46.38% WER, but Bengali warm-start degraded to 55.43%, suggesting the low-rank adapter space was too restrictive for cross-lingual movement.",
        },
        {
          title: "MSE distillation",
          body: "Fresh MSE distillation stayed at 47.22% WER because exact vector matching was brittle across separately adapted teacher and student encoders.",
        },
        {
          title: "Fixed lambda",
          body: "A constant distillation weight pushed teacher matching too early, before the student had useful Assamese ASR behavior.",
        },
        {
          title: "Cosine alignment",
          body: "Cosine loss aligned hidden-state directions instead of magnitudes, moving fresh distillation from 47.22% to 42.10% WER.",
        },
        {
          title: "Progressive lambda warmup",
          body: "Starting lambda at 0 let ASR learning stabilize first, then teacher guidance ramped in gradually.",
        },
        {
          title: "Warm-start plus Progressive Cosine",
          body: "Combining Bengali warm-start with progressive cosine teacher guidance reached 39.63% WER, the best Assamese result.",
        },
      ],
      method: [
        {
          title: "Model",
          body: "Whisper large-v3, top 8 encoder layers unfrozen, decoder trainable.",
        },
        {
          title: "Data",
          body: "AI4Bharat IndicVoices, 50K high-resource samples to 5K low-resource samples.",
        },
        {
          title: "Objective",
          body: "L = L_ASR + lambda(t) * L_distill, with cosine hidden-state alignment.",
        },
        {
          title: "Training",
          body: "Seq2SeqTrainer, jiwer WER/CER, FP16, 2 x NVIDIA A6000 GPUs.",
        },
      ],
      resultTables: [
        {
          title: "Main Assamese Results",
          note: "Progressive Cosine rows used a 2,000-sample Assamese evaluation subset; other Assamese rows used 5,062 validation samples.",
          headers: ["Method", "What mattered", "WER"],
          rows: [
            ["Whisper zero-shot", "Starting failure case", "115.47%"],
            ["Assamese-only baseline", "Target-only fine-tuning", "47.64%"],
            ["Multistage Bengali to Assamese", "Related-language warm-start helped", "41.12%"],
            ["LoRA warm-start", "Low-rank adapter transfer failed", "55.43%"],
            ["MSE distillation, fresh", "Exact hidden-state matching was brittle", "47.22%"],
            ["Progressive Cosine, fresh", "Cosine fixed directional alignment", "42.10%"],
            ["Progressive Cosine, warm-start", "Warm-start plus gradual teacher guidance", "39.63%"],
          ],
        },
        {
          title: "Sanskrit Contrast",
          note: "Sanskrit did not show the same added gain from Progressive Cosine; its baseline was already stronger.",
          headers: ["Method", "Why it mattered", "WER"],
          rows: [
            ["Sanskrit-only baseline", "Much stronger target baseline", "38.52%"],
            ["Multistage Hindi to Sanskrit", "Small related-language gain", "36.84%"],
            ["Progressive Cosine warm-start", "No same added gain as Assamese", "36.97%"],
          ],
        },
      ],
      limitations: [
        "Progressive Cosine used smaller eval subsets: 2,000 Assamese samples and 1,998 Sanskrit samples.",
        "Only one main lambda/warmup configuration was tested.",
        "The method was tested on two related-language pairs, not broad cross-family transfer.",
      ],
      futureWork: [
        "Run the full 5,062-sample Assamese evaluation for Progressive Cosine.",
        "Study sensitivity over lambda_max, warmup fraction, and distilled layer count.",
        "Explore layer-wise distillation weights for the top encoder layers.",
        "Extend the setup to more language pairs such as Tamil to Malayalam, Hindi to Marathi, and cross-family transfer.",
      ],
    },
  },
  {
    slug: "medical-ai-research-portfolio",
    title: "Medical AI Research Portfolio at Lenek Technologies",
    shortTitle: "Medical AI at Lenek",
    category: "Medical AI",
    priority: "P0",
    evidence: "resume-sourced",
    status: "Internship / Applied Machine Learning",
    date: "",
    summary:
      "Internship work at the intersection of medical imaging and computer science, applying machine learning and computer vision to build stronger chest X-ray screening and triage models.",
    problem:
      "Build practical medical-AI research prototypes across chest X-ray tasks while keeping evaluation, thresholding, privacy, and public-safe reporting explicit.",
    approach:
      "Start with CXR normal/abnormal screening, compare backbones and losses, move into disease-specific classifiers, add triage-style ensembling, and support the workflow with GCP-backed experiment handling.",
    stack: [
      "Python",
      "PyTorch",
      "RAD-DINO",
      "EVA-X",
      "EfficientNet",
      "GCP",
      "Vertex AI",
      "Cloud Storage",
      "MedGemma",
      "MAIRA-2",
      "CXR VLMs",
    ],
    highlights: [
      "Applied computer-vision models to chest X-ray screening and medical image classification tasks.",
      "Worked on models for lung-cancer-related nodule screening in chest X-rays, using attention pooling to focus evidence on suspicious image regions.",
      "Built ensemble-style triage logic that combines multiple model signals instead of depending on one classifier.",
      "Used GCP, Vertex AI, and Cloud Storage for training runs, checkpoints, and experiment artifacts.",
      "Currently exploring vision-language models for chest X-ray report generation.",
    ],
    metrics: [
      "JSRT lung nodule screening: AUC 0.923, sensitivity 79.9%, specificity 94.6%.",
      "NIH-810 lung nodule screening: AUC 0.860, sensitivity 79.2%, specificity 80.7%.",
      "CXR ensemble: specificity 0.60 at sensitivity 0.95; specificity 0.43 at sensitivity 0.98.",
    ],
    role: "Medical AI / ML Intern at Lenek Technologies.",
    repo: undefined,
    caseStudy: true,
    featured: true,
    accent: "green",
    caseStudyDetails: {
      sectionLabels: {
        headline: "Headline Result",
        method: "Core Workstreams",
        researchIterations: "Work Progression",
        limitations: "Boundaries",
      },
      headlineMetrics: [],
      featureSections: [
        {
          eyebrow: "Lung-cancer-related nodule screening",
          title: "RAD-DINO with attention pooling for localized CXR evidence",
          body:
            "The strongest measured chest X-ray subproject was lung-cancer-related nodule screening. I used RAD-DINO's high-resolution patch-token representation, partially unfroze the later transformer blocks, and added an attention-pooling head so the classifier could combine global chest context with localized suspicious-region evidence.",
          highlights: [
            "RAD-DINO ViT-B/14 backbone with native 518 x 518 input.",
            "CLS token for global chest context plus patch-token attention pooling for spatial evidence.",
            "Focal loss, AdamW, mixed precision, and differential learning rates for backbone vs. head.",
            "Private Indian datasets are anonymized; public numbers are shown only for JSRT and NIH-810.",
          ],
          metrics: [
            {
              label: "JSRT",
              value: "AUC 0.923",
              detail: "79.9% sensitivity, 94.6% specificity, 123/154 nodules detected, 5 false positives.",
            },
            {
              label: "NIH-810",
              value: "AUC 0.860",
              detail: "79.2% sensitivity, 80.7% specificity, 103/130 nodules detected.",
            },
          ],
        },
        {
          eyebrow: "Current work",
          title: "CXR VLM report-generation experiments",
          body:
            "I am currently working on CXR vision-language model experiments for report generation at Lenek, exploring model directions such as MAIRA-2 and MedGemma for efficient and robust radiology-report generation workflows.",
          highlights: [
            "Focus is report-generation research, not a final use claim.",
            "Current work emphasizes adaptation, evaluation design, and workflow efficiency.",
            "No final VLM metrics are claimed yet.",
          ],
        },
      ],
      method: [
        {
          title: "CXR screening",
          body: "Normal/abnormal frontal CXR classification with RAD-DINO, BCE and focal loss experiments, thresholding, and sensitivity/specificity checks.",
        },
        {
          title: "Nodule and disease classifiers",
          body: "Lung-cancer-related nodule screening was the deepest measured branch, alongside consolidation and pneumothorax classifier work.",
        },
        {
          title: "Ensemble triage",
          body: "RAD-DINO, EfficientNet, and EVA-X outputs combined into likely normal, uncertain, and likely abnormal routing behavior.",
        },
        {
          title: "GCP and VLM workflow",
          body: "Vertex AI, Cloud Storage buckets, checkpoint handling, experiment artifacts, and ongoing CXR VLM report-generation work.",
        },
      ],
      researchIterations: [
        {
          title: "Normal/abnormal screening",
          body: "Started with frontal CXR screening, trained with BCE and focal loss variants, then tested sensitivity/specificity on Montgomery and Shenzhen.",
        },
        {
          title: "Backbone comparison",
          body: "Compared RAD-DINO and EVA-X directions for screening tasks before committing to narrower disease-specific models.",
        },
        {
          title: "Disease-specific turn",
          body: "Moved into consolidation, pneumothorax, and lung nodule classifiers; nodule screening became the strongest measured chest X-ray subproject.",
        },
        {
          title: "RAD-DINO lung nodule screening",
          body: "Used high-resolution patch-token features, partial unfreezing, and attention pooling to focus the classifier on localized suspicious-region evidence.",
        },
        {
          title: "Three-model ensemble triage",
          body: "Combined RAD-DINO, EfficientNet, and EVA-X outputs so the ensemble could route likely normal, uncertain, and likely abnormal cases.",
        },
        {
          title: "GCP workflow",
          body: "Used Vertex AI and Cloud Storage buckets for datasets, training jobs, checkpoints, experiment outputs, and model artifacts.",
        },
      ],
      resultTables: [
        {
          title: "Normal / Abnormal CXR Screening",
          note: "BCE and focal loss experiments were part of this screening model training, with thresholds evaluated through sensitivity and specificity.",
          headers: ["Dataset", "Task", "Sensitivity", "Specificity", "Training note"],
          rows: [
            ["Montgomery", "Normal/abnormal CXR screening", "94.83%", "95.00%", "RAD-DINO with BCE/focal loss experiments"],
            ["Shenzhen", "Normal/abnormal CXR screening", "88.01%", "96.32%", "RAD-DINO with BCE/focal loss experiments"],
          ],
        },
        {
          title: "Triage Ensemble Operating Points",
          note: "RAD-DINO, EfficientNet, and EVA-X outputs were used for sensitivity-first routing experiments.",
          headers: ["Sensitivity target", "Specificity", "What it supports"],
          rows: [
            ["0.95", "0.60", "Higher-specificity review routing"],
            ["0.98", "0.43", "More conservative high-sensitivity routing"],
          ],
        },
      ],
      limitations: [
        "Research and prototype internship work, not autonomous medical use.",
        "Private and Indian datasets are anonymized; no patient images, raw reports, private site names, or private dataset details are published.",
        "Pneumothorax metrics and final EVA-X comparison metrics are not shown until public-safe results are supplied.",
        "CXR VLM report-generation work is ongoing and has no final metrics claimed yet.",
      ],
      futureWork: [],
    },
  },
  {
    slug: "oracle-langgraph-database-integration",
    title: "Oracle Database Checkpointing and Memory Integration for LangGraph.js",
    shortTitle: "Oracle LangGraph Integration",
    category: "AI Infrastructure",
    priority: "P0",
    evidence: "user-sourced",
    status: "Internship / AI Infrastructure",
    date: "Ongoing",
    summary:
      "Oracle internship work building database-backed persistence for stateful AI agents, including checkpointing, long-term memory, vector search, tests, and a working demo.",
    problem:
      "Stateful AI agents need durable memory: they must save progress, recover previous checkpoints, store long-term facts, and search useful context without losing the semantics expected by LangGraph.",
    approach:
      "Build a new Oracle Database integration package for LangGraph.js with checkpoint persistence, long-term memory storage, Oracle-specific schema handling, vector-backed retrieval, validation tests, and a pantry planner demo.",
    stack: [
      "TypeScript",
      "LangGraph.js",
      "Oracle Database",
      "node-oracledb",
      "SQL",
      "VECTOR",
      "BLOB",
      "CLOB",
      "LangChain",
      "OracleVS",
    ],
    highlights: [
      "Built @oracle/langgraph-oracledb for Oracle-backed LangGraph checkpointing and long-term memory.",
      "Implemented OracleCheckpointSaver for checkpoint namespaces, serialized checkpoint blobs, writes, metadata, pending writes, and parent checkpoint linkage.",
      "Implemented OracleStore for hierarchical namespaces, JSON memory values, filtering, search, namespace listing, put/get/delete operations, and vector-backed memory.",
      "Handled Oracle-specific database behavior including identifiers, table prefixes, constraints, empty-string semantics, BLOB/CLOB serialization, transactions, and ORA error handling.",
      "Built tests and a pantry planner demo combining retrieval, checkpointing, and long-term memory through one Oracle connection pool.",
    ],
    metrics: [
      "New package: @oracle/langgraph-oracledb.",
      "Includes OracleCheckpointSaver and OracleStore.",
      "Covers checkpoint saver behavior, SQL helpers, store behavior, Oracle-backed checkpointing, and LangGraph checkpoint validation tests.",
    ],
    role: "Software Engineering Intern at Oracle.",
    repo: undefined,
    caseStudy: true,
    featured: true,
    accent: "blue",
    caseStudyDetails: {
      variant: "oracleInfra",
      sectionLabels: {
        headline: "Integration Surface",
        method: "Implementation Layers",
        researchIterations: "Oracle Engineering Console",
        limitations: "Boundaries",
      },
      headlineMetrics: [
        {
          label: "Package",
          value: "@oracle/langgraph-oracledb",
          detail: "Oracle Database integration package for LangGraph.js.",
        },
        {
          label: "State layer",
          value: "Checkpoints + memory",
          detail: "Durable agent checkpoints and BaseStore-style long-term memory.",
        },
        {
          label: "Demo",
          value: "Pantry planner",
          detail: "Retrieval, checkpointing, and long-term memory using one Oracle connection pool.",
        },
      ],
      featureSections: [
        {
          eyebrow: "Database-backed agent state",
          title: "Durable checkpoints for LangGraph.js agents",
          body:
            "I implemented OracleCheckpointSaver so LangGraph agents can persist checkpoint state in Oracle Database while preserving checkpoint IDs, namespaces, serialized blobs, pending writes, metadata, and parent-child checkpoint relationships.",
          highlights: [
            "Oracle tables for checkpoints, checkpoint blobs, writes, and migration tracking.",
            "Transaction-safe writes for checkpoint data and pending-write state.",
            "Schema setup and migrations designed to be idempotent and retry-safe.",
            "Validation against LangGraph checkpoint behavior tests.",
          ],
        },
        {
          eyebrow: "Long-term memory",
          title: "OracleStore for persistent agent memory and vector search",
          body:
            "I implemented OracleStore for long-term memory so agents can store, retrieve, filter, search, and delete structured memory values across hierarchical namespaces, with vector-backed retrieval support.",
          highlights: [
            "Store tables for JSON values, vector rows, and store migrations.",
            "Namespace listing, put/get/delete operations, filtering, and search.",
            "Native vector binding, vector search, and vector index management.",
            "Preserves LangGraph BaseStore semantics while using Oracle Database underneath.",
          ],
        },
        {
          eyebrow: "Demo and writing",
          title: "Pantry planner demo connecting retrieval, checkpoints, and memory",
          body:
            "I also built a pantry planner notebook and drafted a blog post showing how Oracle Database can support retrieval, checkpointing, and long-term memory together in one stateful agent workflow.",
          highlights: [
            "Used OracleVS from LangChain as an agent retrieval tool.",
            "Shared one Oracle connection pool across retrieval, checkpointing, and memory.",
            "Demonstrated how agent state and retrieved context can work together.",
          ],
        },
      ],
      method: [
        {
          title: "Checkpoint persistence",
          body: "OracleCheckpointSaver stores agent checkpoints, checkpoint blobs, writes, metadata, pending writes, and parent checkpoint links.",
        },
        {
          title: "Long-term memory",
          body: "OracleStore provides BaseStore-style memory with namespaces, JSON values, filtering, search, and vector-backed retrieval.",
        },
        {
          title: "Oracle-specific engineering",
          body: "Handled SQL identifiers, table prefixes, constraints, empty strings as NULL, BLOB/CLOB serialization, transaction behavior, and ORA errors.",
        },
        {
          title: "Testing and demo",
          body: "Added unit and integration tests, connected to LangGraph validation tests, and built a pantry planner demo using OracleVS retrieval.",
        },
      ],
      researchIterations: [
        {
          title: "Checkpoint schema",
          body: "Designed Oracle tables and migrations for checkpoints, serialized blobs, writes, and migration tracking.",
        },
        {
          title: "Checkpoint semantics",
          body: "Preserved LangGraph behavior across checkpoint IDs, namespaces, metadata, pending writes, and parent-child checkpoint relationships.",
        },
        {
          title: "Memory store",
          body: "Built persistent memory operations for hierarchical namespaces, JSON values, filtering, search, namespace listing, and deletion.",
        },
        {
          title: "Vector memory",
          body: "Added vector-backed memory support with native VECTOR binding, vector search, and vector index management.",
        },
        {
          title: "Oracle edge cases",
          body: "Handled Oracle-specific behavior around empty strings, identifier limits, row casing, BLOB/CLOB data, transactions, and ORA error handling.",
        },
        {
          title: "Validation and demo",
          body: "Added tests for SQL helpers, checkpointing, store behavior, LangGraph validation, and a pantry planner notebook.",
        },
      ],
      resultTables: [],
      limitations: [
        "No public repository or documentation link is shown until a public-safe URL is supplied.",
        "This page describes integration engineering and demo work; it does not claim production adoption metrics.",
      ],
      futureWork: [],
    },
  },
  {
    slug: "adaptive-diverse-sampling-cxr",
    title: "Adaptive Diverse Sampling for Chest X-Ray Classification",
    shortTitle: "Adaptive Diverse Sampling",
    category: "Medical Imaging / Generative AI",
    priority: "P0",
    evidence: "report-sourced",
    status: "Medical imaging research",
    date: "CS776",
    summary:
      "Diffusion-based synthetic augmentation for VinDr-CXR binary Normal vs. Abnormal classification, comparing DDPM, DDIM, LCM, and Adaptive Diverse Sampling.",
    problem:
      "Medical datasets can be label-limited, while slow diffusion sampling makes large synthetic augmentation sets expensive.",
    approach:
      "Fine-tune Stable Diffusion v1.5 with LoRA on chest X-rays, then use ADS with randomized classifier-free guidance and controlled stochasticity to generate more diverse augmentation data for DenseNet-121.",
    stack: [
      "Python",
      "PyTorch",
      "Stable Diffusion v1.5",
      "LoRA",
      "DDPM",
      "DDIM",
      "LCM",
      "DenseNet-121",
      "VinDr-CXR",
      "Optuna",
    ],
    highlights: [
      "LoRA applied to UNet attention layers with VAE and CLIP text encoder frozen.",
      "ADS uses 25 DDIM-based steps with randomized guidance g ~ U(3.0, 9.0).",
      "Uses eta = 0.4 stochasticity to reduce repetitive synthetic samples.",
      "Generated 500 Normal and 500 Abnormal synthetic images per method for training-only augmentation.",
    ],
    metrics: [
      "Main comparison reports ADS AUC 0.9708.",
      "ADS reported accuracy 0.9120 and F1 0.9086.",
      "ADS generation speed reported at 5.1 seconds/image.",
      "DDPM reported at 192.9 seconds/image on NVIDIA Tesla T4.",
    ],
    role: "Team course research project.",
    caseStudy: true,
    featured: true,
    accent: "blue",
  },
  {
    slug: "reinforcement-learning-systems",
    title: "Reinforcement Learning Systems",
    shortTitle: "Learning Agents",
    category: "Reinforcement Learning",
    priority: "P1",
    evidence: "report-sourced",
    status: "Full case study",
    date: "EE675",
    summary:
      "A two-part Predator-Prey RL case study covering exact MDP modeling, value iteration, policy iteration, empirical transition-kernel estimation, and REINFORCE policy-gradient control.",
    problem:
      "Understand the same control environment from both model-based planning and learned stochastic policy perspectives.",
    approach:
      "Build the exact MDP pipeline first, then implement a PyTorch REINFORCE agent and compare optimizer behavior under noisy episodic returns.",
    stack: ["Python", "NumPy", "PyTorch", "Matplotlib", "ReportLab", "MDPs"],
    highlights: [
      "State space modeled as joint predator and prey positions with size N^4.",
      "Implemented exact transition kernels, rewards, Bellman policy evaluation, value iteration, and policy iteration.",
      "Estimated transition kernels empirically from simulator samples.",
      "Built a stochastic policy network with two 64-unit ReLU hidden layers and softmax over 9 actions.",
    ],
    metrics: [
      "Value iteration and policy iteration Q-values matched within about 1e-7 to 1e-5 L1 difference.",
      "Kernel-estimation error decreased with larger sample count K, consistent with 1/sqrt(K).",
      "Adam improved REINFORCE rewards from about 14 to 20+ in the source writeup.",
    ],
    role: "EE675 coursework project.",
    caseStudy: true,
    featured: true,
    accent: "amber",
  },
  {
    slug: "surge-sanskrit-asr",
    title: "SURGE ASR in Sanskrit",
    shortTitle: "SURGE Speech Research",
    category: "Speech Research",
    priority: "P1",
    evidence: "repo-backed",
    status: "Research experience",
    date: "May 2025 - July 2025",
    summary:
      "Domain-adaptation research for low-resource Sanskrit ASR, including DSN and GRL architectures, Hindi/Sanskrit data handling, and WER/CER evaluation utilities.",
    problem:
      "Sanskrit speech recognition has limited labeled data, which makes domain adaptation and transfer learning important.",
    approach:
      "Prototype DSN and GRL architectures in PyTorch, evaluate domain adaptation behavior, and connect the findings to later Whisper-based transfer work.",
    stack: ["Python", "PyTorch", "TorchAudio", "Librosa", "NumPy", "SciPy", "kaldiio"],
    highlights: [
      "Implemented Gradient Reversal Layer and domain classifier components.",
      "Built DSN-style shared and private encoder structures.",
      "Handled Hindi/Sanskrit source-target data loading and preprocessing.",
      "Includes final report and poster artifacts locally.",
    ],
    metrics: [
      "Resume reports 62.73% WER and 20.09% CER.",
      "Resume reports prosodic feature integration degraded WER to 69.66%.",
    ],
    role: "SURGE 2025 research project under Prof. Rajesh M. Hegde.",
    repo: "https://github.com/Devx228/SURGE_ASR",
    caseStudy: true,
    featured: false,
    accent: "cyan",
  },
  {
    slug: "iitk-mini-mips",
    title: "IITK-Mini-MIPS",
    shortTitle: "Mini Processor",
    category: "Computer Architecture",
    priority: "P1",
    evidence: "repo-backed",
    status: "Systems proof",
    date: "March 2025 - April 2025",
    summary:
      "A Verilog implementation of a simplified MIPS-like processor built through phased modules covering registers, memory, instruction decode, ALU, PC logic, integration, and testbenches.",
    problem:
      "Build and verify a processor datapath/control path capable of instruction-level execution.",
    approach:
      "Use phased Verilog modules and testbenches for register files, memory, instruction formats, fetch/decode, ALU behavior, branch/jump logic, and top-level integration.",
    stack: ["Verilog HDL", "MIPS-like ISA", "Testbenches", "Computer Architecture"],
    highlights: [
      "Integrated register, memory, decode, ALU, PC logic, and writeback modules.",
      "Testbench checks PC, registers, and memory state.",
      "Low-level systems work alongside the ML and research projects.",
    ],
    metrics: [
      "Repo supports instruction-level control flow and testbench verification.",
      "Hardware deployment and workload details are kept out of this public summary for now.",
    ],
    role: "CS220 lab project under Prof. Debapriya Basu Roy.",
    repo: "https://github.com/vedh18/IITK-Mini-Mips",
    caseStudy: true,
    featured: false,
    accent: "red",
  },
  {
    slug: "iitk-lecture-hall-booking-portal",
    title: "IITK Lecture Hall Booking Portal",
    shortTitle: "Lecture Hall Booking",
    category: "Full-Stack Systems",
    priority: "P1",
    evidence: "repo-backed",
    status: "Full-stack proof",
    date: "January 2025 - April 2025",
    summary:
      "A full-stack campus infrastructure portal with authenticated booking workflows, live availability, approval flows, generated reports, and role-aware UI.",
    problem:
      "Lecture hall booking needs reliable conflict handling, approval chains, visibility into availability, and administrative reporting.",
    approach:
      "Pair a Django REST backend with a React/Vite frontend for booking, approval, room management, schedule views, PDF bills, and CSV exports.",
    stack: [
      "Django",
      "Django REST Framework",
      "React",
      "Vite",
      "PostgreSQL",
      "SimpleJWT",
      "ReportLab",
      "Ant Design",
    ],
    highlights: [
      "JWT login and role-aware access.",
      "Availability and conflict checks across date, time, duration, and room constraints.",
      "Tokenized email approvals and rejections.",
      "PDF bill generation and CSV daily schedule export.",
    ],
    metrics: [
      "Repo supports booking, approval, schedule export, and billing workflows.",
      "Screenshots and contribution split are kept out of this public summary for now.",
    ],
    role: "CS253 course project under Prof. Indranil Saha.",
    repo: "https://github.com/chaitanyavb-502/CS253_Automated_Lecture_Hall_Booking_Portal",
    caseStudy: true,
    featured: false,
    accent: "blue",
  },
  {
    slug: "hybrid-semantic-rag",
    title: "Enhancing RAG with Hybrid and Semantic Search",
    shortTitle: "Document QA Search",
    category: "LLM Engineering",
    priority: "P1",
    evidence: "repo-backed",
    status: "AI search system",
    date: "March 2025 - April 2025",
    summary:
      "A measured RAG pipeline combining dense vector retrieval, BM25, Reciprocal Rank Fusion, cross-encoder reranking, source-grounded generation, and Streamlit interaction.",
    problem:
      "LLM answers need retrieval quality controls and source grounding to reduce unsupported responses.",
    approach:
      "Combine sparse and dense retrieval, fuse rankings, rerank with a cross-encoder, generate with local Ollama/Mistral, and evaluate retrieval/generation quality.",
    stack: [
      "Python",
      "LangChain",
      "ChromaDB",
      "Sentence Transformers",
      "BM25",
      "CrossEncoder",
      "Ollama",
      "Streamlit",
    ],
    highlights: [
      "PDF/text ingestion with persistent ChromaDB vectors.",
      "Hybrid sparse/dense retrieval with RRF.",
      "Cross-encoder reranking for candidate quality.",
      "Evaluation artifacts for response quality.",
    ],
    metrics: [
      "68 evaluated questions in the repo report.",
      "Average response time 6.35s and p95 response time 10.55s.",
      "Reported hallucination rate 0.0441 and false citation rate 0.0.",
    ],
    role: "Self project.",
    repo: "https://github.com/Devx228/Dev_RAG",
    caseStudy: true,
    featured: false,
    accent: "green",
  },
  {
    slug: "sanskrit-whisper-finetuning",
    title: "Sanskrit ASR / Whisper Fine-Tuning",
    shortTitle: "Sanskrit Speech",
    category: "Speech Research",
    priority: "P2",
    evidence: "repo-backed",
    status: "Related speech work",
    date: "May 2025 - June 2025",
    summary:
      "Low-resource Sanskrit ASR fine-tuning pipeline around Whisper, including preprocessing, evaluation, inference, and prosody-fusion experiments.",
    problem:
      "Sanskrit ASR has limited labeled data, so pretrained speech models need careful adaptation and evaluation.",
    approach:
      "Fine-tune Whisper with memory-aware training scripts, WER/CER metric hooks, audio preprocessing, and experimental prosodic features.",
    stack: ["Python", "PyTorch", "Hugging Face", "Whisper", "Librosa", "TensorBoard"],
    highlights: [
      "Training, inference, transcript parsing, and plotting scripts.",
      "Prosodic feature extraction for pitch and energy experiments.",
      "Good related node in the broader ASR research track.",
    ],
    metrics: [
      "Resume claims 52.59% WER and 14.13% CER.",
      "Kept as a related ASR project rather than the primary ASR case study.",
    ],
    role: "Summer project under Prof. Rajesh M. Hegde.",
    repo: "https://github.com/Devx228/ASR_Whisper_Finetuning",
    caseStudy: false,
    featured: false,
    accent: "cyan",
  },
  {
    slug: "yeast-protein-localization",
    title: "Yeast Protein Localization",
    shortTitle: "Yeast Protein ML",
    category: "Data Science",
    priority: "P2",
    evidence: "repo-backed",
    status: "Data science project",
    date: "January 2025 - April 2025",
    summary:
      "Unsupervised ML pipeline for yeast protein localization data using feature selection, PowerTransformer normalization, PCA, clustering benchmarks, and cautious biological interpretation.",
    problem:
      "Discover structure in yeast protein data without labels and evaluate whether clusters suggest localization patterns.",
    approach:
      "Normalize features, reduce dimensionality with PCA, compare clustering algorithms, and evaluate with Silhouette, Davies-Bouldin, and Calinski-Harabasz scores.",
    stack: ["Python", "pandas", "NumPy", "scikit-learn", "PCA", "K-Means", "GMM"],
    highlights: [
      "Compared K-Means, GMM, Spectral, Agglomerative, and DBSCAN.",
      "Used multiple unsupervised quality metrics.",
      "Kept biological interpretation cautious.",
    ],
    metrics: [
      "1187 proteins.",
      "3 PCA components explaining 65.76% variance.",
      "Best reduced-data K-Means silhouette 0.273.",
    ],
    role: "EE708 course project.",
    repo: "https://github.com/Devx228/EE_708_project",
    caseStudy: false,
    featured: false,
    accent: "green",
  },
  {
    slug: "iitpulse-online-exam-platform",
    title: "IITPulse Online Exam Platform",
    shortTitle: "IITPulse",
    category: "Full-Stack Product",
    priority: "P3",
    evidence: "resume-sourced",
    status: "Full-stack internship",
    date: "May 2025 - Ongoing",
    summary:
      "MERN-based online exam platform work for test creation, student/teacher dashboards, authentication APIs, bulk question upload, automatic test generation, and analytics-oriented workflows.",
    problem:
      "Coaching institutes need unified workflows for practice tests, feedback, and teacher-side progress analysis.",
    approach:
      "Build MERN stack dashboards and APIs with MongoDB-backed test/question data, Redux state management, and React Query for custom test creation flows.",
    stack: ["MERN", "React", "Node.js", "Express.js", "MongoDB", "Redux", "React Query"],
    highlights: [
      "Student and teacher dashboards.",
      "Authentication, test creation, data retrieval, bulk upload, and automatic generation APIs.",
      "Product-facing web work alongside the research and systems projects.",
    ],
    metrics: [
      "The platform is aiming to support 500+ students and 25+ teachers.",
      "Do not present projected usage as achieved.",
    ],
    role: "Software internship.",
    caseStudy: false,
    featured: false,
    accent: "amber",
  },
];

export const projectCardCopy: Partial<Record<string, ProjectCardCopy>> = {
  "progressive-cosine-distillation-asr": {
    title: "Better Speech Recognition for Indian Languages",
    category: "Speech Recognition Research",
    summary:
      "Research project on making speech-to-text models work better for languages with limited training data, especially Assamese and Sanskrit.",
    highlights: [
      "Helped a large speech model learn from related languages such as Bengali and Hindi.",
      "Compared several training strategies and kept the one that improved Assamese recognition the most.",
      "Built it as a careful research study with clear experiments, failures, and results.",
    ],
    tags: ["Speech-to-text", "Indian languages", "Machine learning", "Research"],
  },
  "medical-ai-research-portfolio": {
    title: "Medical AI Research at Lenek Technologies",
    category: "Medical Imaging Internship",
    summary:
      "Internship work at the intersection of medicine and computer science, using machine learning and computer vision to improve chest X-ray screening models.",
    highlights: [
      "Applied computer vision to medical images so models can flag important patterns in chest X-rays.",
      "Worked on lung-cancer-related nodule screening with model attention focused on suspicious regions.",
      "Built triage-style model combinations and used Google Cloud workflows for experiments.",
    ],
    tags: ["Medical imaging", "Computer vision", "Chest X-rays", "Google Cloud"],
  },
  "oracle-langgraph-database-integration": {
    title: "Oracle Database Integration for AI Agents",
    category: "AI Infrastructure Internship",
    summary:
      "Internship work at Oracle building a database integration that lets AI agents save progress, remember information, and search long-term memory reliably.",
    highlights: [
      "Built a new Oracle Database package for LangGraph.js agents.",
      "Added durable checkpointing so agents can resume from saved state.",
      "Added long-term memory, database search, vector search, tests, and a working demo.",
    ],
    tags: ["Oracle Database", "LangGraph", "LangChain", "Long-term memory", "TypeScript"],
  },
  "adaptive-diverse-sampling-cxr": {
    title: "Synthetic Chest X-Ray Data for Better Training",
    category: "Medical Imaging Research",
    summary:
      "Course research project on creating extra chest X-ray training images so medical image classifiers can learn better when real labeled data is limited.",
    highlights: [
      "Compared different image-generation methods for medical training data.",
      "Used synthetic images only to support model training, not as patient data.",
      "Measured both model quality and how fast each generation method was.",
    ],
    tags: ["Medical imaging", "Image generation", "Data augmentation", "Research"],
  },
  "reinforcement-learning-systems": {
    title: "Learning Agents in a Predator-Prey Game",
    category: "Decision-Making AI",
    summary:
      "Built agents that learn how to act in a small game world, then compared learning from rules with learning from repeated experience.",
    highlights: [
      "Modeled the game rules, rewards, and possible actions.",
      "Compared planning from known rules against learning by trial and error.",
      "Studied how training choices changed the agent's behavior over time.",
    ],
    tags: ["Learning agents", "Game simulation", "Decision making", "Python"],
  },
  "surge-sanskrit-asr": {
    title: "Sanskrit Speech Recognition Research",
    category: "Speech Recognition Research",
    summary:
      "Summer research project on helping computers understand spoken Sanskrit when very little labeled Sanskrit speech data is available.",
    highlights: [
      "Explored ways to transfer learning from related language data.",
      "Built training and evaluation code for Sanskrit speech experiments.",
      "Connected this work to later low-resource speech recognition research.",
    ],
    tags: ["Speech-to-text", "Sanskrit", "Transfer learning", "Research"],
  },
  "iitk-mini-mips": {
    title: "Building a Small Processor",
    category: "Computer Architecture",
    summary:
      "Designed and tested a simplified computer processor to understand how instructions move through hardware step by step.",
    highlights: [
      "Built the main processor parts: registers, memory, instruction decoding, arithmetic, and control flow.",
      "Wrote testbenches to check whether instructions changed the processor state correctly.",
      "Shows low-level systems understanding beneath higher-level AI work.",
    ],
    tags: ["Processor design", "Digital logic", "Hardware testing", "Verilog"],
  },
  "iitk-lecture-hall-booking-portal": {
    title: "Campus Lecture Hall Booking Portal",
    category: "Full-Stack Web Platform",
    summary:
      "A web platform for booking lecture halls, checking room availability, handling approvals, and generating admin reports.",
    highlights: [
      "Built student and administrator workflows for booking and approval.",
      "Handled room availability, conflicts, and schedule exports.",
      "Connected a backend API with a practical web interface.",
    ],
    tags: ["Web app", "Backend APIs", "Booking workflow", "Reports"],
  },
  "hybrid-semantic-rag": {
    title: "Document Question-Answering With Search",
    category: "AI Search System",
    summary:
      "Built a tool that searches through documents and helps a language model answer questions using the most relevant source material.",
    highlights: [
      "Combined different search methods so important document chunks are easier to find.",
      "Added a reranking step to improve the quality of retrieved evidence.",
      "Measured answer quality, speed, and citation reliability.",
    ],
    tags: ["Document search", "Question answering", "Language models", "Evaluation"],
  },
  "sanskrit-whisper-finetuning": {
    title: "Sanskrit Speech-to-Text Fine-Tuning",
    category: "Speech Recognition Research",
    summary:
      "Built a training pipeline to adapt a pretrained speech model for Sanskrit audio and evaluate how well it transcribes speech.",
    highlights: [
      "Prepared audio, transcripts, training scripts, and evaluation utilities.",
      "Tested whether extra voice features could help recognition quality.",
      "Kept this as related groundwork beside the larger speech research project.",
    ],
    tags: ["Speech-to-text", "Sanskrit", "Audio processing", "Model training"],
  },
  "yeast-protein-localization": {
    title: "Finding Patterns in Yeast Protein Data",
    category: "Data Science",
    summary:
      "Used unsupervised machine learning to search for structure in biological data without being given target labels.",
    highlights: [
      "Cleaned and transformed the data before comparing clustering methods.",
      "Reduced complex protein features into a smaller set of useful signals.",
      "Kept the biological interpretation cautious and evidence-based.",
    ],
    tags: ["Data science", "Clustering", "Biology data", "Python"],
  },
  "iitpulse-online-exam-platform": {
    title: "Online Exam Platform",
    category: "Full-Stack Product",
    summary:
      "Internship work on an online testing platform for creating exams, managing question banks, and supporting student and teacher dashboards.",
    highlights: [
      "Worked on test creation, dashboard, authentication, and data workflows.",
      "Supported bulk question handling and automatic test generation features.",
      "Built product-facing web features with a modern JavaScript stack.",
    ],
    tags: ["Web app", "Online exams", "Dashboards", "Product engineering"],
  },
};

export const internshipProjects = projects.filter((project) => project.status.includes("Internship"));
export const featuredProjects = projects.filter((project) => project.featured && !internshipProjects.includes(project));
export const caseStudyProjects = projects.filter((project) => project.caseStudy);

export const skills = [
  {
    title: "Speech And Language",
    icon: Mic2,
    items: ["Speech recognition", "Indian languages", "Audio processing", "Model training", "Transfer learning", "Evaluation"],
  },
  {
    title: "Medical AI",
    icon: Activity,
    items: ["Chest X-ray models", "Medical imaging", "Computer vision", "Nodule screening", "Google Cloud", "Report generation"],
  },
  {
    title: "Machine Learning",
    icon: BrainCircuit,
    items: ["Model training", "Deep learning", "Data analysis", "Clustering", "Experiment tuning", "Python"],
  },
  {
    title: "Reinforcement Learning",
    icon: Radar,
    items: ["Learning agents", "Decision making", "Planning algorithms", "Policy learning", "Simulation", "Reward modeling"],
  },
  {
    title: "AI Search Systems",
    icon: Network,
    items: ["Document search", "Question answering", "Language models", "Evidence retrieval", "Reranking", "Evaluation"],
  },
  {
    title: "Full-Stack",
    icon: Code2,
    items: ["React", "Node", "Express", "MongoDB", "Django REST", "PostgreSQL"],
  },
  {
    title: "Systems",
    icon: CircuitBoard,
    items: ["C", "C++", "Verilog", "Processor design", "Hardware testing", "Computer architecture"],
  },
  {
    title: "Data And Tools",
    icon: Database,
    items: ["Git", "GitHub", "Bash", "Jupyter", "LaTeX", "Matplotlib"],
  },
];

export const experience = [
  {
    title: "Entrance signal",
    label: "Exams and scores",
    detail: "JEE Advanced AIR 673, JEE Mains AIR 1698, MHT-CET 99.992 percentile, and state-topper science certificates.",
  },
  {
    title: "IIT Kanpur CSE",
    label: "B.Tech, 2023-present",
    detail: "Computer Science and Engineering, CPI 8.5/10.0.",
  },
  {
    title: "SURGE 2025",
    label: "Speech research project",
    detail: "Helping computers recognize spoken Sanskrit when labeled training data is limited.",
  },
  {
    title: "Lenek Technologies",
    label: "Medical AI / machine learning internship",
    detail: "Machine learning and computer vision for chest X-ray screening, model triage, and report-generation research.",
  },
  {
    title: "Progressive Cosine Distillation",
    label: "UG research / speech recognition",
    detail: "Improving speech-to-text models for Indian languages with limited data.",
  },
  {
    title: "Oracle",
    label: "AI infrastructure internship",
    detail: "Database-backed checkpointing and long-term memory for stateful AI agents.",
  },
];

export const achievements = [
  "JEE Advanced 2023 AIR 673.",
  "JEE Mains 2023 AIR 1698.",
  "MHT-CET 2023 99.992 percentile.",
  "NSEC 2022 Maharashtra State Topper certificate.",
  "NSEP 2022 Maharashtra State Topper certificate.",
];

export const commandGroups = [
  {
    heading: "Navigation",
    items: [
      { label: "Home", href: "/", icon: TerminalSquare },
      { label: "Projects", href: "/projects", icon: Layers3 },
      { label: "Resume", href: "/resume", icon: GraduationCap },
      { label: "Contact", href: "/contact", icon: ShieldCheck },
    ],
  },
  {
    heading: "Internship",
    items: internshipProjects.map((project) => ({
      label: project.shortTitle,
      href: `/projects/${project.slug}`,
      icon: Activity,
    })),
  },
  {
    heading: "Featured Projects",
    items: featuredProjects.map((project) => ({
      label: project.shortTitle,
      href: `/projects/${project.slug}`,
      icon: FlaskConical,
    })),
  },
];
