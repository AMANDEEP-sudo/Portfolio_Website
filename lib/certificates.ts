import path from 'path';

type CertificateEntry = {
  segments: string[];
  mimeType: string;
  fileName: string;
};

const certificateFileMap: Record<string, CertificateEntry> = {
  'binary-blitz': {
    segments: ['HACKATHONS', 'Binary_Blitz_hackathon.pdf'],
    mimeType: 'application/pdf',
    fileName: 'Binary_Blitz_Hackathon_Amandeep_Aman.pdf',
  },
  'summer-training': {
    segments: ['summer_training_certificate.pdf'],
    mimeType: 'application/pdf',
    fileName: 'Summer_Training_Amandeep_Aman.pdf',
  },
  'neocolab-cpp': {
    segments: ['NEO_COLAB', 'CSE101_CPP_NEOCOLAB_CERTIFICATE.pdf'],
    mimeType: 'application/pdf',
    fileName: 'NeoColab_CPP_Amandeep_Aman.pdf',
  },
  'neocolab-dsa-advanced': {
    segments: ['NEO_COLAB', 'CSE202_DSA_NEOCAOLAB_CERTIFICATE.pdf'],
    mimeType: 'application/pdf',
    fileName: 'NeoColab_Advanced_DSA_Amandeep_Aman.pdf',
  },
  'neocolab-c': {
    segments: ['NEO_COLAB', 'C_PROGRAMMING.pdf'],
    mimeType: 'application/pdf',
    fileName: 'NeoColab_C_Programming_Amandeep_Aman.pdf',
  },
  'neocolab-dsa-foundation': {
    segments: ['NEO_COLAB', 'DSA.pdf'],
    mimeType: 'application/pdf',
    fileName: 'NeoColab_DSA_Foundation_Amandeep_Aman.pdf',
  },
  'neocolab-java': {
    segments: ['NEO_COLAB', 'java_programming.pdf'],
    mimeType: 'application/pdf',
    fileName: 'NeoColab_Java_Amandeep_Aman.pdf',
  },
  'neocolab-oops': {
    segments: ['NEO_COLAB', 'OOPS.pdf'],
    mimeType: 'application/pdf',
    fileName: 'NeoColab_OOPS_Amandeep_Aman.pdf',
  },
  'nptel-mooc': {
    segments: ['NPTEL', '12324928_MOOC_TGZTAPYCertificate.pdf'],
    mimeType: 'application/pdf',
    fileName: 'NPTEL_MOOC_Amandeep_Aman.pdf',
  },
  'oracle-ai': {
    segments: ['ORACLE', 'Race_to_Certification_AI_foundation_associate.pdf'],
    mimeType: 'application/pdf',
    fileName: 'Oracle_AI_Foundation_Amandeep_Aman.pdf',
  },
};

const certificatesRoot = path.join(process.cwd(), 'assets', 'certificates');

export function getCertificateMeta(id: string) {
  const certificate = certificateFileMap[id];
  if (!certificate) {
    return null;
  }

  return {
    mimeType: certificate.mimeType,
    fileName: certificate.fileName,
    absolutePath: path.join(certificatesRoot, ...certificate.segments),
  };
}
