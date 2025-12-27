import { Modal, Button, useOverlayState } from '@heroui/react';
import { version } from '../core/constants';
import { useEffect } from 'react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  const state = useOverlayState({ isOpen, onOpenChange: (open) => !open && onClose() });

  useEffect(() => {
    if (isOpen) {
      state.open();
    } else {
      state.close();
    }
  }, [isOpen, state]);

  return (
    <Modal state={state}>
      <Modal.Backdrop variant="blur" />
      <Modal.Container placement="center" size="lg">
        <Modal.Dialog className="bg-slate-800 border border-slate-700">
          {({ close }: { close: () => void }) => (
            <>
              <Modal.Header className="flex flex-col gap-1 border-b border-slate-700">
                <h2 className="text-2xl font-bold text-white">Credits</h2>
                <p className="text-sm text-slate-400 font-normal">
                  Made with ❤️ by the community
                </p>
              </Modal.Header>

              <Modal.Body className="py-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      Development
                    </h3>
                    <div className="space-y-2 text-slate-300">
                      <p className='text-white font-medium'>• blals</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      Contributors
                    </h3>
                    <div className="space-y-2 text-slate-300">
                      <p>• TheHypeWalrus — Testing</p>
                    </div>
                  </div>

                  {/* Technologies Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="text-orange-400">🛠️</span>
                      Built With
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                        Tauri
                      </span>
                      <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                        React
                      </span>
                      <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                        TypeScript
                      </span>
                      <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                        Tailwind CSS
                      </span>
                      <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                        HeroUI
                      </span>
                      <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300 border border-slate-600">
                        Framer Motion
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-sm text-slate-400 text-center">
                      Version {version}
                    </p>
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer className="border-t border-slate-700">
                <Button
                  onPress={() => {
                    close();
                    onClose();
                  }}
                  className="bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium"
                >
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}
