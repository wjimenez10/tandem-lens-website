import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Check, FileText, Shield, BarChart3 } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  icon: typeof FileText;
  fileName: string;
}

const leadMagnets: LeadMagnet[] = [
  {
    id: 'ciso-guide',
    title: "The CISO's Guide to Board Reporting",
    description:
      'Plantillas y métricas para comunicar el valor de seguridad a la alta dirección.',
    icon: FileText,
    fileName: 'ciso-board-reporting-guide.pdf',
  },
  {
    id: 'ransomware-playbook',
    title: 'Ransomware Response Playbook 2025',
    description:
      'Protocolo paso a paso para responder a incidentes de ransomware.',
    icon: Shield,
    fileName: 'ransomware-playbook-2025.pdf',
  },
  {
    id: 'hrm-roi',
    title: 'Human Risk Management ROI Calculator',
    description:
      'Hoja de cálculo para medir el retorno de inversión de tu programa HRM.',
    icon: BarChart3,
    fileName: 'hrm-roi-calculator.xlsx',
  },
];

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMagnet?: string;
}

export default function LeadMagnetModal({
  isOpen,
  onClose,
  selectedMagnet,
}: LeadMagnetModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedResource, setSelectedResource] = useState(
    selectedMagnet || leadMagnets[0].id
  );

  const { trackLeadMagnetDownload } = useAnalytics();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !acceptPrivacy) return;

    const magnet = leadMagnets.find((m) => m.id === selectedResource);
    if (magnet) {
      trackLeadMagnetDownload(magnet.title, email);
    }

    setSubmitted(true);

    // Simulate download after 1 second
    setTimeout(() => {
      // In production, this would trigger actual file download
      console.log('Downloading:', magnet?.fileName);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-navy-100 border-white/10 max-w-lg max-h-[90vh] overflow-y-auto">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">
                Descarga gratuita
              </DialogTitle>
              <DialogDescription className="text-slate-text">
                Accede a recursos exclusivos de ciberseguridad.
              </DialogDescription>
            </DialogHeader>

            {/* Resource Selection */}
            <div className="space-y-3 mt-4">
              {leadMagnets.map((magnet) => {
                const MagnetIcon = magnet.icon;
                return (
                  <button
                    key={magnet.id}
                    onClick={() => setSelectedResource(magnet.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedResource === magnet.id
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <MagnetIcon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{magnet.title}</p>
                        <p className="text-xs text-slate-text mt-1">
                          {magnet.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <label className="text-sm font-medium mb-1 block">Nombre</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="bg-navy-200 border-white/10"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Email corporativo
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  className="bg-navy-200 border-white/10"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Empresa</label>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Nombre de tu empresa"
                  className="bg-navy-200 border-white/10"
                  required
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="privacy"
                  checked={acceptPrivacy}
                  onCheckedChange={(checked) =>
                    setAcceptPrivacy(checked as boolean)
                  }
                  required
                />
                <label htmlFor="privacy" className="text-xs text-slate-text">
                  Acepto recibir comunicaciones de Tandem Lens y la{' '}
                  <a href="#" className="text-cyan-400 hover:underline">
                    política de privacidad
                  </a>
                  .
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-500 text-navy-200 hover:bg-cyan-400"
                disabled={!acceptPrivacy}
              >
                <Download className="mr-2 w-4 h-4" />
                Descargar ahora
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <DialogTitle className="font-heading text-xl mb-2">
              ¡Descarga iniciada!
            </DialogTitle>
            <DialogDescription className="text-slate-text mb-6">
              Hemos enviado el enlace de descarga a {email}. También recibirás
              actualizaciones mensuales de ciberseguridad.
            </DialogDescription>
            <Button onClick={onClose} variant="outline" className="w-full">
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
